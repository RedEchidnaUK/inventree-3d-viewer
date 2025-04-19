import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { useEffect } from "react";
import { deepDispose } from "./dispose";

interface ModelWrapperReturn {
  boundingSphere: any;
  modelJSX: JSX.Element;
}

export function modelWrapper(url: string): ModelWrapperReturn {
  let myModel: any;

  useEffect(() => {
    return () => {
      deepDispose(myModel);
    };
  }, [url]);

  if (url.toLowerCase().endsWith('.glb') || url.toLowerCase().endsWith('.gltf')) {
    myModel = useLoader(GLTFLoader, url).scene;
    return {
      boundingSphere: myModel,
      modelJSX: (
        <mesh>
          <primitive object={myModel} position={[0, 0, 0]} />
        </mesh>
      )
    };
  }
  else if (url.toLowerCase().endsWith('.stl')) {
    myModel = useLoader(STLLoader, url);
    if (!myModel.boundingSphere) {
      myModel.computeBoundingSphere();
    }
    return {
      boundingSphere: myModel.boundingSphere,
      modelJSX: (
        <mesh>
          <primitive object={myModel} attach="geometry" />
          <meshStandardMaterial color={"#D3D3D3"} />
        </mesh>
      )
    };
  }
  else {
    return {
      boundingSphere: null,
      modelJSX: <mesh />
    };
  }
}
