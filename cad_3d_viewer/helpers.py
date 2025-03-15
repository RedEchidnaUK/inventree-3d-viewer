import os

# Description: Helper functions for the CAD 3D Viewer

# Function: Check if a GLB file is valid
def is_valid_glb(glb_file):
    """Check if a GLB file is valid"""
    try:
        with open(glb_file, 'rb') as file:
            header = file.read(12)
            if header.startswith(b'glTF'):
                return True
            else:
                return False
    except Exception as e:
        return False

# Function: Check if a STL file is valid 
def is_valid_stl(stl_file):
    """Check if a STL file is valid"""
    try:
        with open(stl_file, 'rb') as file:
            header = file.read(80)
            if header.startswith(b'solid'):
                return True  # ASCII STL file
            else:
                try:
                    num_triangles = int.from_bytes(file.read(4), byteorder='little')
        
                    # Calculate expected file size
                    expected_size = 84 + num_triangles * 50  # 84 bytes header + 50 bytes per triangle
                    actual_size = os.path.getsize(stl_file)
                    
                    return actual_size == expected_size # Binary STL file
                except ValueError:
                    return False 
    except Exception as e:
        return False