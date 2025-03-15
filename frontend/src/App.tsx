import { useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls, Environment, Html, useProgress } from "@react-three/drei";
import { Box } from '@mantine/core';
import { CameraControlPanel } from './CameraControlPanel'
import { Model } from "./Model"
import { ModelSelector } from "./ModelSelector";
import { DownloadCanvas } from "./DownloadCanvas";
import './App.css';

interface ModelAttachement {
  id: number;
  attachment: string;
  filename: string;
}

function App(context: any) {

  const modelAttachments: ModelAttachement[] = context.context.context.attachments;
  const [selectedModel, setSelectedModel] = useState<string>(modelAttachments[0].attachment);
  const controlsRef = useRef<any>(null);
  const modelRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  // #region Functions
  function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
  }

  const handleModelLoad = () => {
    controlsRef.current.setLookAt(0, 0, 1, 0, 0, 0, false);
    if (modelRef.current.getBoundingSphere()) {
        controlsRef.current.fitToSphere(modelRef.current.getBoundingSphere(), false);
    }
  };

  const handleModelSelectChange = (selectedUrl: string) => {
    setSelectedModel(selectedUrl);
  };
  //#endregion

  return (
    <div className="app-container">
      <Box className="overlay">
        <ModelSelector modelUrls={modelAttachments} onModelChange={handleModelSelectChange} />
        <DownloadCanvas canvasRef={canvasRef} />
      </Box>
      <div className="canvas-container" ref={canvasRef}>
        <Canvas gl={{ preserveDrawingBuffer: true }} >
          <CameraControls ref={controlsRef} />
          <Suspense fallback={<Loader />}>
            <Model onLoad={handleModelLoad} url={selectedModel} ref={modelRef} />
          </Suspense>
          <Environment preset="studio" />
        </Canvas>
      </div>
      {context.context.context.cameraControlsEnabled && <CameraControlPanel controlsRef={controlsRef} modelRef={modelRef} />}
    </div>
  )
}

export default App
