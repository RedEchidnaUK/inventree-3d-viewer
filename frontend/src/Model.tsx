import { useEffect, forwardRef, useImperativeHandle } from "react";
import { modelWrapper } from "./modelWrapper";

interface ModelProps {
  onLoad?: () => void;
  url: string;
}

export const Model = forwardRef<any, ModelProps>(({ onLoad, url }, ref) => {
  useImperativeHandle(ref, () => ({
    getBoundingSphere: () => myModel.boundingSphere
  }));

  let myModel = modelWrapper(url);

  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  return myModel.modelJSX;
});
