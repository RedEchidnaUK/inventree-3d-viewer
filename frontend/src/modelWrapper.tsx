import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { useRef } from "react";
import { deepDispose } from "./dispose";
import { Vector3, Sphere, Object3D, Box3 } from "three";

interface ModelWrapperReturn {
  boundingSphere: Sphere | null;
  modelJSX: JSX.Element;
}

export function modelWrapper(url: string): ModelWrapperReturn {
  const previousModelRef = useRef<Object3D | null>(null);
  let myModel: any;

  if (url.toLowerCase().endsWith('.glb') || url.toLowerCase().endsWith('.gltf')) {
    // cleanup previous model
    if (previousModelRef.current) {
      deepDispose(previousModelRef.current);
    }

    myModel = useLoader(GLTFLoader, url).scene.clone();
    previousModelRef.current = myModel; // Update the reference to the current model

    const box = new Box3().setFromObject(myModel);
    const size = box.getSize(new Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z)
    const desiredSize = 1 // Desired size for the largest dimension. KiCad seems to make very small models so we have to scale them up
    const scaleFactor = desiredSize / maxDimension
    myModel.scale.set(scaleFactor, scaleFactor, scaleFactor);

    const scaledBbox = new Box3().setFromObject(myModel);
    const boundingSphere = scaledBbox.getBoundingSphere(new Sphere());

    return {
      boundingSphere: boundingSphere,
      modelJSX: (
        <mesh>
          <primitive object={myModel} position={[0, 0, 0]} />
        </mesh>
      )
    };
  }
  else if (url.toLowerCase().endsWith('.stl')) {

    // cleanup previous model
    if (previousModelRef.current) {
      deepDispose(previousModelRef.current);
    }

    // Load the STL model
    myModel = useLoader(STLLoader, url);
    previousModelRef.current = myModel; // Update the reference to the current model

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
