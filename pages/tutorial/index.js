import Head from 'next/head';

import Layout from '../../components/layout/Layout';
import styles from './styles.module.css';

const Tutorial = ({}) => {
  return (
    <>
      <Head>
        <title>Tutorial</title>
      </Head>
      <Layout className={styles['wrapper']}>
        <h1>Markdown Tutorial</h1>
        <p>
          Welcome to the Markdown tutorial! Here, we&apos;ll cover the basics of
          Markdown syntax so you can start writing beautiful blog posts in no
          time.
        </p>
        <h2>Headings</h2>
        <p>
          To create a heading, simply prefix your text with a hash symbol (#).
          The number of hash symbols indicates the level of the heading. For
          example:
        </p>
        <pre>
          {`# H1
## H2
### H3
#### H4
##### H5
###### H6`}
        </pre>
        <h2>Paragraphs</h2>
        <p>
          To create a paragraph, simply write your text on a new line. To create
          a new paragraph, add a blank line between your paragraphs.
        </p>
        <h2>Emphasis</h2>
        <p>
          To create emphasis, you can use asterisks (*) or underscores (_) to
          wrap your text. For example:
        </p>
        <pre>
          {`*italic*
**bold**
__underline__`}
        </pre>
        <h2>Lists</h2>
        <p>
          To create an unordered list, prefix each item with a hyphen (-) or an
          asterisk (*). To create an ordered list, prefix each item with a
          number followed by a period (.). For example:
        </p>
        <pre>
          {`- Item 1
- Item 2
- Item 3

1. Item 1
2. Item 2
3. Item 3`}
        </pre>
        <h2>Links</h2>
        <p>To create a link, use the following format:</p>
        <pre>{`[Link text](URL)`}</pre>
        <p>For example:</p>
        <pre>{`[Google](https://www.google.com)`}</pre>
        <h2>Images</h2>
        <p>To add an image, use the following format:</p>
        <pre>{`![Alt text](image URL)`}</pre>
        <p>For example:</p>
        <pre>{`![Cute cat](https://placekitten.com/200/300)`}</pre>
        <h2>Code Blocks</h2>
        <p>
          To create a code block, wrap your code in backticks (`) or use triple
          backticks for a multi-line code block. For example:
        </p>
        <div className={styles['codes']}>
          <pre>
            {`Inline code: \`console.log('Hello, world!');\`


Multi-line code:

\`\`\`
function greet(name) {
  console.log('Hello, ' + name + '!');
}

greet('world');

\`\`\`


code with language:

\`\`\`cpp

int addNum(int a, int b) {
  return a + b;
}

add (29, 40);

\`\`\``}
          </pre>
        </div>
        <h2>Math Equation</h2>
        <p>
          To write math equations, wrap them with <code>$</code> for inline and{' '}
          <code>$$</code> for multiline. Math is done by katex. Search google or
          visit this:{' '}
          <a href='https://sixthform.info/katex/guide.html' className='anchor'>
            https://sixthform.info/katex/guide.html
          </a>{' '}
        </p>
        <span>Example:</span>
        <pre>
          {`
Inline:
$ E = mc^2 $

Multiline: 
$$ 
E = mc^2
m = \\frac{E}{c^2}
$$
`}
        </pre>
        <p>
          Also see this for supported syntax:{' '}
          <a href='https://katex.org/docs/supported.html' className='anchor'>
            https://katex.org/docs/supported.html
          </a>
        </p>
        <h2>Tables</h2>
        <p>
          To add a table, use three or more hyphens (---) to create each
          column’s header, and use pipes (|) to separate each column. For
          compatibility, you should also add a pipe on either end of the row.
          <pre>
            {`
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
`}
          </pre>
          Here is a link to more detailed guide:{' '}
          <a
            href='https://www.markdownguide.org/extended-syntax/#tables'
            className='anchor'
          >
            https://www.markdownguide.org/extended-syntax/#tables
          </a>
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
      </Layout>
    </>
  );
};

export default Tutorial;
