import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useReducer,
} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import socket from "../services/socketService";
import fontFormats from "../utils/fontFomats";
import "./QuillEditor.css";
import * as d3 from "d3";
const QuillEditor = () => {
  const [value, setValue] = useState("");
  const [fontSize,setFontSize] =useState("16px")
  const Quill = useRef(null);
  const temp = useRef(true);
  const btn = useRef(null);
  const btn1 = useRef(null);
  const btn2 = useRef(null);
  const btn3 = useRef(null);
  const getGrid = (e) => {
    d3.select(".line-x")
      .attr("x1", e.clientX)
    .attr("x2",e.clientX)
    d3.select(".linee").
      attr("class", "linee")
  };
  useEffect(() => {
    console.log("reredered!!!!!!");
})

  useEffect(() => {
    d3.select('body').append("svg")
      .attr("transform", "translate(0,-600)")
      .attr("class", "linee hidden")
      .attr("height", 600)
      .attr("width","100%")
      .append("line")
      .attr("class","line-x")
      .attr("stroke", "black")
      .attr("y1", 0)
      .attr("y2", 600)
      .style("stroke-width", 1)
      .style("stroke-dasharray", "4 4");
      
      const width = 1200;
      const height = 20;
      const margin = { top: 0, bottom: 20, left: 2, right: 2 };
      
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      
    const svg = d3.select(".grid-x").append("svg").attr("height", height).attr("class","ruler-x").attr("width","70%")
    const scale = d3.scaleLinear()
      .domain([0, 18+9*8])
      .range([0, innerWidth]);

    const axis = d3.axisBottom(scale)
      .tickValues(d3.range(0, 19+9*8)) // Include 12 for the end tick
      .tickFormat((d) => ((d*2) % 5 === 0 ? "i" : '')) // Display inch values on larger ticks
      .tickSize(6) // Smaller ticks
      .tickSizeOuter(12) // Larger ticks for inch values
      .tickPadding(5); // Adjust padding between ticks and labels
  // axis.tickColor("white").tickLabelColor("white");
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
      g.selectAll(".tick").style("stroke", "white");
      g.selectAll(".text").style("fill", "white");
    g.call(axis);

    // Add labels for larger ticks (inch values)
    g.selectAll('text')
      .filter((d) => d % 5 === 0)
      .attr('x', (d) => scale(d))
      .attr('y', innerHeight + 5)
      .text((d) => d / 5) 
      .attr('fill', 'white');
    g.selectAll("line")
    .attr("stroke","white")
    
  }, [])
  //left - grid
  useEffect(() => {
     d3.select("body")
       .append("svg")
       .attr("transform", "translate(0,-600)")
       .attr("class", "linee")
       .attr("width", 700)
       .attr("height", "10px")
       .append("line")
       .attr("class", "line-y")
       .attr("stroke", "black")
       .attr("x1", 0)
       .attr("x2", 600)
       .style("stroke-width", 1)
      .style("stroke-dasharray", "4 4");
    
            const width = 20;
            const height = 1200;
            const margin = { top: 40, bottom: 2, left: 7, right: 0 };

            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            const svg = d3
              .select(".grid-y")
              .append("svg")
              .attr("height", "100%")
              .attr("class", "ruler-y")
              .attr("width", width);
            const scale = d3
              .scaleLinear()
              .domain([0, 18 + 9 * 8])
              .range([0, innerHeight]);

            const axis = d3
              .axisLeft(scale)
              .tickValues(d3.range(0, 19 + 9 * 8)) // Include 12 for the end tick
              .tickFormat((d) => ((d ) % 2 === 0 ? d : "")) // Display inch values on larger ticks
              .tickSize(6) // Smaller ticks
              .tickSizeOuter(12) // Larger ticks for inch values
              .tickPadding(5); // Adjust padding between ticks and labels
            // axis.tickColor("white").tickLabelColor("white");
            const g = svg
              .append("g")
              .attr("transform", `translate(${margin.left}, ${margin.top})`);
            g.selectAll(".tick").style("stroke", "white");
            g.selectAll(".text").style("fill", "white");
            g.call(axis);

            // Add labels for larger ticks (inch values)
            g.selectAll("text")
              .filter((d) => d % 5 === 0)
              .attr("y", (d) => scale(d))
              .attr("x", 5)
              .text((d) => d / 5)
              .attr("fill", "white");
            g.selectAll("line").attr("stroke", "white");
  },[])
  const handleDrag1 = (e) => {
    btn.current = btn1.current;
    getGrid(e);
  };
  const handleDrag2 = (e) => {
    btn.current = btn2.current;
    getGrid(e);
  };
  const handleDrag3 = (e) => {
    btn.current = btn3.current;
    getGrid(e);
  };
  const handleUp = () => {
     d3.select(".linee").attr("class", "linee hidden");
    btn.current = null;
  };

  useEffect(() => {
    const quillInstance = Quill.current.getEditor();
    console.log(quillInstance);
    socket.on("change", (delta) => {
      console.log(delta);
      temp.current = false;
      quillInstance.updateContents(delta);
      temp.current = true;
    });
  }, []);
  const handleChange = useCallback((content, delta, source, editor) => {
    if (temp.current === false) return;
    // console.log(delta);
    socket.emit("change", delta);
  }, []);

  return (
    <>
      <div
        className="grid-x"
        onMouseMove={(e) => {
          if (btn.current == null) return;
          if (
            e.clientY < e.target.getBoundingClientRect().top + 1 ||
            e.clientY >
              e.target.getBoundingClientRect().top +
                e.target.getBoundingClientRect().height -
                1
          ) {
            btn.current = null;
            d3.select(".linee")
            .attr("class","linee hidden")
            return;
          }
          console.log("changing", btn.current);
          let width = btn.current.getBoundingClientRect().width;
          d3
            .select(".line-x")
            .attr("x1", e.clientX)
            .attr("x2", e.clientX);
          btn.current.style.left = e.clientX - width / 2 + "px";
        }}
        onMouseUp={handleUp}
      >
        <button
          onMouseDown={(e) => handleDrag1(e)}
          ref={btn1}
          className="btn"
          style={{ left: "120px" }}
        >
          <img src="" alt="" srcset="" />
        </button>
        <button
          onMouseDown={(e) => handleDrag2(e)}
          // onMouseUp={(e) => handleUp(e)}
          className="btn"
          ref={btn2}
          style={{ left: "0px" }}
        >
        </button>
        <button
          onMouseDown={(e) => handleDrag3(e)}
          // onMouseUp={(e) => handleUp(e)}
          className="btn"
          ref={btn3}
          style={{ left: "30px" }}
        >
        </button>
      </div>
      <div className="grid-y">

      </div>
      <ReactQuill
        ref={Quill}
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Write something..."
        style={{ height: "100%", margin: "0px", padding: "0px" }}
      />
    </>
  );
};


  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
        [{ size: [] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["link", "image", "video"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["clean"],
      ]
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "script",
    "align",
    "list",
    "indent",
    "link",
    "image",
    "video",
  ];
console.log(fontFormats);
export default QuillEditor;
