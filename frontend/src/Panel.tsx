import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Render a custom panel with the provided context.
 * Refer to the InvenTree documentation for the context interface
 * https://docs.inventree.org/en/stable/extend/plugins/ui/#plugin-context
 */



/**
 * Render the ThreeDViewerPanel component.
 * 
 * @param target - The target HTML element to render the panel into
 * @param context - The context object to pass to the panel
 */
export function renderCAD3DViewerPanel(target: HTMLElement, context: any) {
    createRoot(target).render(
        <>
            <link rel="stylesheet" href={`${context.host}static/plugins/${context.context.slug}/assets/style.css`} />
            <MantineProvider theme={context.theme} defaultColorScheme={context.colorScheme}>
                <App context={context} />
            </MantineProvider>
        </>
    );
}
