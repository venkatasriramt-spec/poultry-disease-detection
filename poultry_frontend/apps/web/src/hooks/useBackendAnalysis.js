
import { useState } from 'react';

export function useBackendAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeImage = async (imageFile, apiKey) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://poultryvision-ai.onrender.com';
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('gemini_api_key', apiKey);

      const response = await fetch(`${backendUrl}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorMsg = `Server error: ${response.status}`;
        try {
          const errData = await response.json();
          if (errData.detail) errorMsg = errData.detail;
          else if (errData.error) errorMsg = errData.error;
        } catch (e) {
          // Ignored
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      return {
        status: data.status || 'success',
        primary_diagnosis: data.primary_diagnosis,
        confidence: data.confidence,
        report: data.report,
        distribution: data.distribution || {},
        original_image_base64: data.original_image_base64,
        heatmap_image_base64: data.heatmap_image_base64
      };
    } catch (error) {
      console.error('Analysis error:', error);
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { analyzeImage, isAnalyzing };
}
