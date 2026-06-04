
import html2pdf from 'html2pdf.js';

export const generateDiagnosticPDF = async ({ imagePreview, analysisResult }) => {
  if (!analysisResult) return;

  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const timestamp = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}`;

  const getBase64Src = (base64Str) => {
    if (!base64Str) return '';
    return base64Str.startsWith('data:image') ? base64Str : `data:image/jpeg;base64,${base64Str}`;
  };

  const originalImageSrc = analysisResult.original_image_base64 
    ? getBase64Src(analysisResult.original_image_base64) 
    : imagePreview;
    
  const heatmapSrc = analysisResult.heatmap_image_base64 
    ? getBase64Src(analysisResult.heatmap_image_base64) 
    : null;

  const rawConfidence = analysisResult.confidence || 0;
  const confidencePercent = rawConfidence <= 1 ? rawConfidence * 100 : rawConfidence;
  const cappedConfidence = Math.min(100, Math.max(0, confidencePercent)).toFixed(1);

  const distributionHtml = Object.entries(analysisResult.distribution || {})
    .sort(([, a], [, b]) => b - a)
    .map(([className, prob]) => {
      const cProb = Math.min(100, Math.max(0, prob <= 1 ? prob * 100 : prob)).toFixed(1);
      return `
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
          <span style="text-transform: capitalize; color: #374151;">${className}</span>
          <span style="font-weight: bold; color: #111827;">${cProb}%</span>
        </div>
        <div style="height: 6px; background-color: #E5E7EB; border-radius: 4px; margin-bottom: 16px; overflow: hidden;">
          <div style="height: 100%; background-color: #06B6D4; width: ${cProb}%; border-radius: 4px;"></div>
        </div>
      `;
    }).join('');

  // Format the report text into HTML
  let reportHtml = '';
  if (analysisResult.report) {
    const lines = analysisResult.report.split('\n');
    let inList = false;
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('#')) {
        if (inList) { reportHtml += '</ul>'; inList = false; }
        const content = trimmed.replace(/^#+\s*/, '').replace(/\*/g, '');
        reportHtml += `<h4 style="font-size: 16px; font-weight: bold; color: #1F2937; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #E5E7EB; padding-bottom: 4px;">${content}</h4>`;
      } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        if (!inList) { reportHtml += '<ul style="margin-left: 20px; margin-bottom: 16px; color: #4B5563; font-size: 14px; line-height: 1.6;">'; inList = true; }
        let content = trimmed.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        reportHtml += `<li style="margin-bottom: 6px;">${content}</li>`;
      } else if (trimmed.length > 0) {
        if (inList) { reportHtml += '</ul>'; inList = false; }
        let content = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        reportHtml += `<p style="margin-bottom: 12px; color: #4B5563; font-size: 14px; line-height: 1.6;">${content}</p>`;
      }
    });
    if (inList) { reportHtml += '</ul>'; }
  }

  const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1F2937; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #FFFFFF;">
      
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 28px; font-weight: bold; color: #111827; margin: 0 0 8px 0;">Poultry Health Diagnostic Report</h1>
        <p style="font-size: 16px; color: #6B7280; margin: 0;">AI-Powered Veterinary Diagnostic System</p>
        <hr style="border: none; border-top: 2px solid #E5E7EB; margin-top: 20px;" />
      </div>

      <!-- Metadata -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 14px; color: #4B5563;">
        <div><strong>Date:</strong> ${formattedDate}</div>
        <div><strong>Time:</strong> ${formattedTime}</div>
      </div>

      <!-- Primary Finding -->
      <div style="background-color: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center;">
        <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #6B7280; margin: 0 0 10px 0;">Primary Finding</h2>
        <h3 style="font-size: 32px; font-weight: bold; color: #111827; text-transform: capitalize; margin: 0 0 15px 0;">${analysisResult.primary_diagnosis || 'Unknown'}</h3>
        <div style="display: inline-block; background-color: #FFFFFF; border: 1px solid #E5E7EB; padding: 8px 16px; border-radius: 20px; font-size: 16px; font-weight: bold; color: #06B6D4;">
          Confidence: ${cappedConfidence}%
        </div>
      </div>

      <!-- Images Section -->
      <div style="display: flex; justify-content: space-between; gap: 20px; margin-bottom: 30px; page-break-inside: avoid;">
        <div style="flex: 1; text-align: center;">
          <h4 style="font-size: 14px; color: #4B5563; margin-bottom: 10px;">Submitted Image for Analysis</h4>
          <img src="${originalImageSrc}" style="max-width: 100%; max-height: 250px; object-fit: contain; border: 1px solid #E5E7EB; border-radius: 8px;" />
        </div>
        ${heatmapSrc ? `
        <div style="flex: 1; text-align: center;">
          <h4 style="font-size: 14px; color: #4B5563; margin-bottom: 10px;">Model Attention Map (Grad-CAM)</h4>
          <img src="${heatmapSrc}" style="max-width: 100%; max-height: 250px; object-fit: contain; border: 1px solid #E5E7EB; border-radius: 8px;" />
        </div>
        ` : ''}
      </div>

      <!-- Probability Distribution -->
      <div style="margin-bottom: 30px; page-break-inside: avoid;">
        <h3 style="font-size: 18px; font-weight: bold; color: #111827; border-bottom: 1px solid #E5E7EB; padding-bottom: 8px; margin-bottom: 16px;">Diagnostic Confidence Distribution</h3>
        <div style="background-color: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 20px;">
          ${distributionHtml}
        </div>
      </div>

      <!-- Clinical Summary -->
      ${reportHtml ? `
      <div style="margin-bottom: 40px;">
        <h3 style="font-size: 18px; font-weight: bold; color: #111827; border-bottom: 1px solid #E5E7EB; padding-bottom: 8px; margin-bottom: 16px;">Clinical Summary</h3>
        <div style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 20px;">
          ${reportHtml}
        </div>
      </div>
      ` : ''}

      <!-- Footer -->
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; font-size: 12px; color: #9CA3AF; page-break-inside: avoid;">
        <p style="margin: 0 0 4px 0;">Veterinary AI Diagnostics Platform</p>
        <p style="margin: 0;">Generated on ${formattedDate} at ${formattedTime}</p>
      </div>
    </div>
  `;

  const element = document.createElement('div');
  element.innerHTML = htmlContent;
  
  const opt = {
    margin: [20, 15, 20, 15],
    filename: `Poultry_Diagnostic_Report_${timestamp}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  return html2pdf().set(opt).from(element).save();
};
