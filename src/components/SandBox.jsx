"use client";
import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";

export default function SandBox() {
  function MyEditor() {
    const [value, setValue] = useState("");
  }
  return (
    <>
      <h1>sandbox</h1>
      <CodeMirror
        value={value}
        options={{
          lineNumbers: true,
          mode: "javascript",
        }}
        onBeforeChange={(editor, data, value) => {
          setValue(value);
        }}
      />
    </>
  );
}
