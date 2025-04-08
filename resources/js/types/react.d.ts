import React from 'react';
import { ModelViewerAttributes } from '@google/model-viewer';
import { LiteYTEmbed } from '@justinribeiro/lite-youtube';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & ModelViewerAttributes, HTMLElement>;
      "lite-youtube": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & LiteYTEmbed, HTMLElement>;
    }
  }
}
  