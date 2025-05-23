# -*- coding: utf-8 -*-

import importlib
import importlib.util
import os
import setuptools

"""This file is used to package the CAD3DViewer plugin.

- It was generated by the InvenTree Plugin Creator tool - version 1.1.1
- Ref: https://github.com/inventree/plugin_creator
"""

"""Read the plugin version from the source code."""
module_path = os.path.join(os.path.dirname(__file__), "cad_3d_viewer", "__init__.py")
spec = importlib.util.spec_from_file_location("cad_3d_viewer", module_path)
cad_3d_viewer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cad_3d_viewer)

with open('README.md', encoding='utf-8') as f:
    long_description = f.read()

setuptools.setup(
    name="cad_3d_viewer",
    version=cad_3d_viewer.PLUGIN_VERSION,
    author="Red Echidna",
    author_email="github@redechidna.com",
    description="A 3D file viewer for part attachments",
    long_description=long_description,
    long_description_content_type='text/markdown',
    url="https://github.com/RedEchidnaUK/inventree-3d-viewer",
    license="MIT",
    packages=setuptools.find_packages(),
    include_package_data=True,
    install_requires=[
        # Enter your plugin library dependencies here
    ],
    setup_requires=[
        "wheel",
        "twine",
    ],
    python_requires=">=3.9",
    entry_points={
        "inventree_plugins": [
            "CAD3DViewer = cad_3d_viewer.core:CAD3DViewer"
        ]
    },
)
