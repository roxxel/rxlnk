'use client'
import {
  toolbarPlugin,
  KitchenSinkToolbar,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
  markdownShortcutPlugin,
  SandpackConfig,
  MDXEditor,
  MDXEditorMethods,
} from '@mdxeditor/editor'
import { RefObject } from 'react'

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

const reactSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live',
      sandpackTemplate: 'react',
      sandpackTheme: 'dark',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent,
    },
  ],
}
const allPlugins = (diffMarkdown: string) => [
  toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  tablePlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
  sandpackPlugin({ sandpackConfig: reactSandpackConfig }),
  codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),
  directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
  diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown }),
  markdownShortcutPlugin(),
]

type Props = { 
  markdown: string,
  editorRef: RefObject<MDXEditorMethods>,
  onChange: (markdown: string) => void
}

export function FullEditor({ markdown, editorRef, onChange }: Props) {
  return <MDXEditor ref={editorRef} onChange={onChange} className='px-8 md:px-16' markdown={markdown} contentEditableClassName="p-2 bg-[#161618_!important] first:rounded-t-md last:rounded-b-md markdown-body max-w-full font-sans" plugins={allPlugins(markdown)} />
}