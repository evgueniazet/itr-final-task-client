import ReactMarkdown from 'react-markdown';
import { TMarkdownEditorProps } from './MarkdownEditor.types';

export const MarkdownEditor = ({ markdownText }: TMarkdownEditorProps) => {
    return <ReactMarkdown>{markdownText}</ReactMarkdown>;
};
