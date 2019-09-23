import * as faceapi from 'face-api.js';

// Load models and weights
export async function loadModels() {
  const MODEL_URL = process.env.PUBLIC_URL + '/models';
    faceapi.loadTinyFaceDetectorModel(MODEL_URL);
    faceapi.loadFaceLandmarkModel(MODEL_URL);
    faceapi.loadFaceRecognitionModel(MODEL_URL);
    faceapi.loadFaceExpressionModel(MODEL_URL);
}