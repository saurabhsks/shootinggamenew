import { useEffect } from "react";
import * as THREE from "three";

export const useMouseFollow = (
  cylinderRef: React.RefObject<THREE.Mesh | null>,
  camera: THREE.Camera
) => {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!cylinderRef.current) return;
      
     
      const gunBasePosition = cylinderRef.current.position.clone();
      
      
      const x = ((event.clientX / window.innerWidth) * 2 - 1) * 2;
      const y = (-(event.clientY / window.innerHeight) * 2 + 1) * 2;
      
     
      const targetPosition = new THREE.Vector3(
        gunBasePosition.x + x * 10, 
        gunBasePosition.y + y * 10, 
        gunBasePosition.z - 5 
      );
      
     
      const lookAtTarget = new THREE.Vector3(
        gunBasePosition.x - (targetPosition.x - gunBasePosition.x) * 2, 
        gunBasePosition.y - (targetPosition.y - gunBasePosition.y) * 2, 
        gunBasePosition.z + 5
      );
      
     
      cylinderRef.current.lookAt(lookAtTarget);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cylinderRef, camera]);
};