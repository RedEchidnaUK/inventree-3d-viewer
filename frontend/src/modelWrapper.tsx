import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

interface ModelWrapperReturn {
  boundingSphere: any;
  modelJSX: JSX.Element;
}

export function modelWrapper(url: string): ModelWrapperReturn {

  if (url.toLowerCase().endsWith('.glb') || url.toLowerCase().endsWith('.gltf')) {
    const myModel = useLoader(GLTFLoader, url);

    return {
      boundingSphere: myModel.scene,
      modelJSX: (
        <mesh>
          <primitive object={myModel.scene} position={[0, 0, 0]} />
        </mesh>
      )
    };
  } else if (url.toLowerCase().endsWith('.stl')) {
    const myModel = useLoader(STLLoader, url);

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
  } else {
    return {
      boundingSphere: null,
      modelJSX: (
        <mesh />
      )
    };
  }
}
