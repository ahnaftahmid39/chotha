import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

const TextAreaInput = ({ spaces = 4, className, text, setText }, ref) => {
  useEffect(() => {
    if (text.caret >= 0) {
      text.target.setSelectionRange(text.caret + spaces, text.caret + spaces);
    }
  }, [text]);

  const taRef = useRef();

  useImperativeHandle(ref, () => {
    const ta = taRef.current;
    const content = ta.value;

    return {
      value: content,
      focus: () => {
        ta.focus();
      },
      toggleWrap: (shoulWrap) => {
        if (shoulWrap) ta.classList.add('no-wrap');
        else ta.classList.remove('no-wrap');
      },
      giveHeadings: (type = 'h1') => {
        let i = ta.selectionStart;
        let j = ta.selectionEnd;
        while (content[i] == ' ') i++;
        while (content[j - 1] == ' ' && j > i) j--;

        let placeholder = '';
        let symbol = '';

        let p = i;
        let q = j;

        switch (type) {
          case 'h1':
            placeholder = 'Heading 1';
            symbol = '# ';
            break;
          case 'h2':
            placeholder = 'Heading 2';
            symbol = '## ';
            break;
          case 'h3':
            placeholder = 'Heading 3';
            symbol = '### ';
            break;
          default:
            break;
        }

        let newText = '';

        const symlen = symbol.length;
        const toggleOff = content.substring(i - symlen, i) == symbol;

        if (toggleOff) {
          newText = content.substring(0, i - symlen);
          if (content[j] == '\n') {
            newText += content.substring(i, j);
            newText += content.substring(j + 1);
          } else {
            newText += content.substring(i);
          }
          p -= symlen;
          q -= symlen;
        } else {
          let middle = i == j ? placeholder : content.substring(i, j);
          let pre = '';
          let next = '';
          let i2 = i;
          let i3 = j;
          while (i2--) {
            if (content[i2] == '\n') break;
            else if (content[i2] == ' ' || content[i2] == '#') continue;
            else {
              pre = '\n';
              console.log('adding pre');
              p++;
              q++;
              break;
            }
          }
          while (i3++ && i3 < content.length) {
            if (content[i3] == '\n') break;
            else if (content[i3] == ' ') continue;
            else {
              next = '\n';
              break;
            }
          }
          newText =
            content.substring(0, i) +
            pre +
            symbol +
            middle +
            next +
            content.substring(j);

          p += symlen;
          q += symlen;
        }

        if (i == j) {
          q += placeholder.length;
        }

        setText({ caret: q, value: newText, target: ta });
        setTimeout(() => {
          ta.setSelectionRange(p, q);
          ta.focus();
        }, 0);
      },
      boldItalic: (opt = 'bold') => {
        let i = ta.selectionStart;
        let j = ta.selectionEnd;
        while (content[i] == ' ') i++;
        while (content[j - 1] == ' ' && j > i) j--;

        let placeholder = '';
        let symbol = '';

        if (opt == 'bold') {
          placeholder = 'Bold';
          symbol = '**';
        } else if (opt == 'italic') {
          placeholder = 'Italic';
          symbol = '*';
        } else {
          placeholder = 'Bold Italic';
          symbol = '***';
        }

        const middle = i == j ? placeholder : content.substring(i, j);

        let newText = '';
        const symlen = symbol.length;
        const toggleOff =
          content.substring(i - symlen, i) == symbol &&
          content.substring(j, j + symlen) == symbol;

        if (toggleOff) {
          newText =
            content.substring(0, i - symlen) +
            content.substring(i, j) +
            content.substring(j + symlen);
        } else {
          // console.log(i, j);
          newText =
            content.substring(0, i) +
            symbol +
            middle +
            symbol +
            content.substring(j);
        }
        const caret =
          i == j
            ? j + symlen + placeholder.length
            : toggleOff
            ? j - symlen
            : j + symlen;
        const start = toggleOff ? i - symlen : i + symlen;

        setText({ caret: caret, value: newText, target: ta });

        setTimeout(() => {
          ta.setSelectionRange(start, caret);
          ta.focus();
        }, 0);
      },
      newLine: () => {
        const i = ta.selectionStart;
        const caret = ta.selectionEnd;
        let newText = content.substring(0, i) + '  \n' + content.substring(i);
        setText({ value: newText, caret: caret - 1, target: ta });
        ta.focus();
      },
    };
  });

  const handleShortcuts = (e) => {
    let content = e.target.value;
    let caret = e.target.selectionStart;

    if (e.key === 'Tab') {
      e.preventDefault();
      let newText =
        content.substring(0, caret) +
        ' '.repeat(spaces) +
        content.substring(caret);

      setText({ value: newText, caret: caret, target: e.target });
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      let newText =
        content.substring(0, caret) + '  \n' + content.substring(caret);

      setText({ value: newText, caret: caret - 1, target: e.target });
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'S') {
      const element = document.createElement('a');
      element.style.display = 'none';
      const file = new Blob([text.value], {
        type: 'text/markdown',
      });
      element.href = URL.createObjectURL(file);
      element.download = 'myFile.md';
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  };

  const handleText = (e) => {
    setText({ value: e.target.value, caret: -1, target: e.target });
  };

  return (
    <textarea
      ref={taRef}
      spellCheck={false}
      onChange={handleText}
      className={className}
      onKeyDown={handleShortcuts}
      value={text.value}
    />
  );
};

export default forwardRef(TextAreaInput);
