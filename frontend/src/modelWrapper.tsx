import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { useEffect } from "react";

interface ModelWrapperReturn {
  boundingSphere: any;
  modelJSX: JSX.Element;
}


function disposeModel(model: any) {
  if (model && model.traverse) {
    console.log("Disposing model with traverse");
    model.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.geometry.dispose();
        if (obj.material.isMaterial) {
          obj.material.dispose();
          if (obj.material.map) {
            obj.material.map.dispose();
          }
        }
      }
    });
  }
  else if (model) {
    console.log("Disposing model");
    model.dispose();
  }
}


export function modelWrapper(url: string): ModelWrapperReturn {
  let myModel: any;

  useEffect(() => {
    return () => {
      // Dispose previous model when component unmounts
      disposeModel(myModel);
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
