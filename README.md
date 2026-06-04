# 🐔 PoultryVision AI
### Hierarchical Deep Learning & Grounded Generative AI for Poultry Disease Diagnosis

AI-powered veterinary intelligence system that detects poultry diseases from images and provides medically grounded diagnostic guidance using **Hierarchical CNNs, Explainable AI (Grad-CAM), and Gemini 2.5 Flash (Grounded Generation)**.

![Python](https://img.shields.io/badge/Python-3.10+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![TensorFlow](https://img.shields.io/badge/TensorFlow-Keras-FF6F00)
![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-purple)
![Netlify](https://img.shields.io/badge/Frontend-Netlify-success)
![Render](https://img.shields.io/badge/Backend-Render-blue)

---

# 🌐 Live Deployment

### Frontend
https://poultryvisionai.netlify.app

### Backend API
https://poultryvision-ai.onrender.com

---

# 📂 Dataset

📦 Google Drive Dataset (Training Data)

https://drive.google.com/drive/folders/1zi5JhKOdnpP-1-FYupjOVPMtwvuyZhJB?usp=drive_link

> This dataset includes curated poultry disease images used for training the hierarchical CNN models. It contains multiple disease classes including Bumblefoot, CRD, Fowl Pox, and Infectious Coryza.

---


# 📖 Executive Summary

PoultryVision AI is an end-to-end AI system designed to assist in poultry disease diagnosis through image analysis.

Unlike conventional single-stage classifiers, this system uses a **Hierarchical Diagnostic Architecture**:

1. **Bouncer Model (Binary Classifier)**
   → Detects whether the bird is Healthy or Sick

2. **Doctor Model (4-Class Classifier)**
   → Identifies specific disease type:
   - Bumblefoot
   - Chronic Respiratory Disease (CRD)
   - Fowl Pox
   - Infectious Coryza

The predictions are enhanced with **Explainable AI (Grad-CAM)** and passed into a **Grounded LLM (Gemini 2.5 Flash)** to generate structured veterinary recommendations.

---

# 🚀 System Features

- 🧠 Hierarchical CNN architecture
- 🔍 Disease detection from images
- 🧪 Explainable AI (Grad-CAM heatmaps)
- 🤖 Gemini-powered veterinary consultation engine
- 📊 Confidence-based prediction reporting
- 🌐 Full-stack web application
- ☁️ Cloud deployment (Netlify + Render)

---

# 🏗️ System Architecture

```text
Image Upload
     │
     ▼
[Bouncer Model]
Healthy / Sick
     │
     ▼
[Doctor Model]
4-Disease Classification
     │
     ▼
[Grad-CAM Engine]
     │
     ▼
[Gemini 2.5 Flash - Grounded AI]
     │
     ▼
Veterinary Diagnostic Report
```

---

# 🧹 Data Pipeline

- Combined original poultry datasets with Roboflow-augmented data
- Custom TensorFlow cleaning pipeline removed corrupted images
- Dataset optimized for hierarchical training architecture
- Split into binary + multi-class training environments

---

# 🧠 Model Performance

## 🟢 1. Bouncer Model (Binary Classifier)

**Task:** Healthy vs Sick classification

### Overall Metrics
- Accuracy: **82%**
- Macro Precision: **80%**
- Macro Recall: **82%**

### Per-Class Performance

| Class | Precision | Recall |
|------|----------|--------|
| Healthy | 79% | 84% |
| Sick | 81% | 80% |

### Insights
- Strong recall (84%) for Healthy class ensures reliable identification of healthy poultry
- Balanced precision-recall tradeoff for early disease detection

---

## 🔴 2. Doctor Model (4-Disease Classifier)

**Task:** Classifies Sick birds into 4 disease categories

### Overall Metrics
- Accuracy: **72%**
- Macro Precision: **70%**
- Macro Recall: **66%**

---

## 🦶 Bumblefoot

| Metric | Score |
|--------|------|
| Precision | 68% |
| Recall | 62% |

---

## 🫁 Chronic Respiratory Disease (CRD)

| Metric | Score |
|--------|------|
| Precision | 71% |
| Recall | 69% |

---

## 🎯 Fowl Pox

| Metric | Score |
|--------|------|
| Precision | 72% |
| Recall | 71% |

---

## 🧬 Infectious Coryza

| Metric | Score |
|--------|------|
| Precision | 69% |
| Recall | 63% |

---

### Model Insights

- CRD and Fowl Pox show the strongest classification stability
- Bumblefoot and Coryza require further dataset balancing
- Confidence distribution indicates stable probabilistic learning behavior

---

# 🔍 Explainable AI (XAI)

### Grad-CAM Visualization
- Highlights infected regions in poultry images
- Provides transparency into CNN decision-making
- Helps validate model predictions visually

---

# 🤖 Grounded Generative AI (Gemini 2.5 Flash)

The system uses a **controlled prompt engineering framework**:

- Model outputs → probability vector
- Grad-CAM → visual explanation
- Gemini receives structured input
- Output is constrained using veterinary knowledge base

### Output Includes:
- Diagnosis summary
- Risk level assessment
- Immediate action plan
- Long-term care guidelines

---

# 💻 Tech Stack

## Frontend
- React (Vite)
- Tailwind CSS
- React Router

## Backend
- FastAPI
- Python
- TensorFlow / Keras
- OpenCV

## AI Layer
- CNN (Hierarchical)
- Grad-CAM
- Gemini 2.5 Flash

## Deployment
- Netlify (Frontend)
- Render (Backend)

---

# 📂 Project Structure

```text
PoultryVision_AI
│
├── poultry_frontend
│   ├── apps/web
│   ├── src
│   └── public
│
├── backend
│   ├── models
│   ├── services
│   ├── routes
│   └── main.py
│
└── README.md
```

---

# ⚙️ Local Setup

```bash
git clone https://github.com/AYUSHMSINGH2004/PoultryVision_AI.git
cd PoultryVision_AI
```

## Frontend

```bash
cd poultry_frontend
npm install
npm run dev
```

## Backend

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

---

# 🚀 Deployment Configuration

## Netlify

- Base Directory: `poultry_frontend`
- Build Command: `npm run build`
- Publish Directory: `dist/apps/web`

### Environment Variables

```env
VITE_API_BASE_URL=https://poultryvision-ai.onrender.com
VITE_BACKEND_URL=https://poultryvision-ai.onrender.com
```

---

# 👥 Contributors

| Name | Registration No. | Role & Contribution |
|------|------------------|---------------------|
| **Ayush M Singh** | 23BDS0033 | ML Lead & Backend Lead — Designed hierarchical CNN models, built FastAPI backend, implemented Grad-CAM explainability, integrated Gemini grounded generation system, and handled backend deployment architecture |
| **Venkata Sriram Topalli** | 23BCE0441 | Frontend Lead & Integration Lead — Built React UI, handled frontend architecture, API integration, state management, UX optimization, and end-to-end system integration |

---

# 🔮 Future Improvements

- Mobile application (Flutter / React Native)
- Real-time farm monitoring system
- Larger multi-disease dataset expansion
- Edge deployment for offline inference
- Multi-language veterinary assistant

---

# ⭐ Support

If you found this project useful:

⭐ Star this repository  
🍴 Fork it  
🤝 Contribute improvements  

---

# 📜 License

Educational / Academic Use Only
