"""A 3D file viewer for part attachments"""

from plugin import InvenTreePlugin
from part.models import Part
from common.models import InvenTreeSetting
from plugin.mixins import SettingsMixin, UserInterfaceMixin
from . import helpers

from . import PLUGIN_VERSION


class CAD3DViewer(SettingsMixin, UserInterfaceMixin, InvenTreePlugin):

    """CAD3DViewer - InvenTree plugin."""

    # Plugin metadata
    TITLE = "CAD 3D Viewer"
    NAME = "CAD3DViewer"
    SLUG = "cad-3d-viewer"
    DESCRIPTION = "A 3D file viewer for part attachments"
    VERSION = PLUGIN_VERSION

    # Additional project information
    AUTHOR = "Red Echidna"
    WEBSITE = "https://github.com/RedEchidnaUK/inventree-3d-viewer"
    LICENSE = "MIT"

    # Optionally specify supported InvenTree versions
    # MIN_VERSION = '0.18.0'
    # MAX_VERSION = '2.0.0'
    
    
    # Plugin settings (from SettingsMixin)
    # Ref: https://docs.inventree.org/en/stable/extend/plugins/settings/
    SETTINGS = {
        # Define your plugin settings here...
        'CONTROLS_ENABLE': {
            'name': 'Camera control functionality',
            'description': 'Enable camera control functionality',
            'validator': bool,
            'default': True,
        }
    }
    
    
    # User interface elements (from UserInterfaceMixin)
    # Ref: https://docs.inventree.org/en/stable/extend/plugins/ui/
    
    # Custom UI panels
    def get_ui_panels(self, request, context: dict, **kwargs):
        
        """Return a list of custom panels to be rendered in the InvenTree user interface."""
        base_url = InvenTreeSetting.get_setting('INVENTREE_BASE_URL')
        
        panels = []

        # Only display this panel for the 'part' target
        if context.get('target_model') == 'part':

            part = Part.objects.get(pk=context.get('target_id'))
            part_attachments = part.attachments
            attachments_info = []

            filtered_GLBs = part_attachments.filter(attachment__endswith='.glb')
            if filtered_GLBs.count() > 0:
                for attachment in filtered_GLBs:
                    if helpers.is_valid_glb(attachment.attachment.path):
                        path = attachment.attachment.name
                        filename = path.split('/')[-1]
                        attachment_info = {
                            'id': attachment.pk,
                            'attachment': base_url + '/media/' + path,
                            'filename': filename
                        }

                        attachments_info.append(attachment_info)

            filtered_STLs = part_attachments.filter(attachment__endswith='.stl')
            if filtered_STLs.count() > 0:  
                for attachment in filtered_STLs:
                    if helpers.is_valid_stl(attachment.attachment.path):
                        path = attachment.attachment.name
                        filename = path.split('/')[-1]
                        attachment_info = {
                            'id': attachment.pk,
                            'attachment': base_url + '/media/' + path,
                            'filename': filename
                        }

                        attachments_info.append(attachment_info)

            if len(attachments_info) > 0:
                panels.append({
                    'key': '3d-viewer-panel',
                    'title': '3D Viewer',
                    'description': 'Custom panel description',
                    'icon': 'ti:rotate-3d:outline',
                    'source': self.plugin_static_file('Panel.js:renderCAD3DViewerPanel'),
                    'context': {
                        'slug': self.SLUG,
                        'attachments': attachments_info,
                        'cameraControlsEnabled': self.get_setting('CONTROLS_ENABLE')
                    }
                })
        
        return panels
    
