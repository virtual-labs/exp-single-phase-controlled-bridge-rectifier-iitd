// * Audio Mute
let isMute = false;

// * Current Date
let cd = new Date();
var currentDateGlobal = `${cd.getDate()} - ${
  cd.getMonth() + 1
} - ${cd.getFullYear()}`;
console.log(currentDateGlobal);

// * Quiz object
const Quiz = {
  quizData: [
    {
      question:
        "Which of the following machine is used to measure compressive strength?",
      a: "Universal testing machine",
      b: "Impact testing machine",
      c: "Fatigue testing machine",
      d: "Erichsen machine",
      correct: "a",
    },
    {
      question:
        "Which one of the following, is not a unit of ultimate tensile strength?",
      a: "MPa",
      b: "N/m2",
      c: "Kg/m3",
      d: "PSI",
      correct: "c",
    },
    {
      question: "The extensometer can be attached anywhere to the specimen _",
      a: "Yes",
      b: "No",
      c: "No but sometime yes",
      d: "None of the above",
      correct: "b",
    },

    {
      question:
        "What is the smallest measurement that is possible by vernier calliper?",
      a: "Least count",
      b: "Actual reading",
      c: "Main scale division",
      d: "Vernier scale division",
      correct: "a",
    },
    {
      question: "What is the least count of a standard metric vernier caliper",
      a: "0.002mm",
      b: "0.02mm",
      c: "0.1mm",
      d: "0.2mm",
      correct: "b",
    },
  ],
  quiz_contianer: document.querySelector(".quiz-container"),
  quiz: document.getElementById("quiz"),
  answerEls: document.querySelectorAll(".answer"),
  questionEl: document.getElementById("question"),
  a_text: document.getElementById("a_text"),
  b_text: document.getElementById("b_text"),
  c_text: document.getElementById("c_text"),
  d_text: document.getElementById("d_text"),
  ansDom: document.getElementById("quizAns"),
  opsDom: [this.a_text, this.b_text, this.c_text, this.d_text],
  loadQuizCallCount: 0,
  currentQuiz: 0,
  score: 0,
  loadQuiz() {
    if (this.currentQuiz >= this.quizData.length) {
      return;
    }
    document.querySelector(".transparent-box").style.display = "block";
    this.loadQuizCallCount++;
    window.speechSynthesis.cancel();
    setCC("Choose the correct answer.");
    this.deselectAnswers();
    this.quiz_contianer.style.display = "block";
    const currentQuizData = this.quizData[this.currentQuiz];

    this.questionEl.innerText = currentQuizData.question;
    this.a_text.innerText = currentQuizData.a;
    this.b_text.innerText = currentQuizData.b;
    this.c_text.innerText = currentQuizData.c;
    this.d_text.innerText = currentQuizData.d;
  },

  getSelected() {
    let answer = undefined;
    this.answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }
    });
    this.answerEls.forEach((answerEl) => {
      if (answer != undefined) {
        answerEl.disabled = true;
      }
    });

    return answer;
  },

  deselectAnswers() {
    this.answerEls.forEach((answerEl) => {
      answerEl.checked = false;
      answerEl.disabled = false;
    });
  },
  close() {
    this.quiz_contianer.style.display = "none";
    for (let od of this.opsDom) {
      od.style.color = "";
    }
    document.querySelector(".transparent-box").style.display = "none";

    // this.ansDom.style.display = "none";
  },
  init() {
    let okBtn = document.getElementById("quizSubmit");
    okBtn.textContent = "Submit";
    // onclick for quiz close btn
    // document.querySelector("#closeQuiz").onclick = () => {
    //   this.close();
    // };
    // onclick for quiz submit btn
    document.getElementById("quizSubmit").onclick = () => {
      // for disable multiple submit
      if (this.loadQuizCallCount - 1 !== this.currentQuiz) {
        return;
      }
      // subtitle for quiz
      const answer = this.getSelected();
      if (answer) {
        // this.ansDom.style.display = "block";
        // this.ansDom.innerHTML = "✔ "+ this.quizData[this.currentQuiz][this.quizData[this.currentQuiz].correct];

        // updating options with the right and wrong emoji
        let ops = "abcd";
        for (let o in ops) {
          if (ops[o] == this.quizData[this.currentQuiz].correct) {
            this.opsDom[o].innerHTML += " ✔️";
            this.opsDom[o].style.color = "green";
          } else {
            this.opsDom[o].innerHTML += " ❌";
            this.opsDom[o].style.color = "red";
          }
        }

        if (answer === this.quizData[this.currentQuiz].correct) {
          this.score++;
        }
        this.currentQuiz++;

        //for ok button

        okBtn.textContent = "Ok";
        okBtn.onclick = function () {
          Quiz.close();
          Quiz.init();
        };

        // to stop the next question
        // if (this.currentQuiz < this.quizData.length) {
        // this.loadQuiz();
        // } else {
        //             this.quiz.innerHTML = ` <h2>You answered correctly at ${this.score}/${this.quizData.length} questions.</h2>
        // <button onclick="#">Reload</button>
        // `;
        // todo show above string to certificate
        // }
      }
      // this.close();
    };
  },
};

// * ChartJs
const ChartGraph = {
  ctx: document.getElementById("myChart"),
  ctxBox: document.querySelector(".chart"),
  graphs: [
    (Graph1 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
    (Graph2 = {
      labels: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      datapoints: [0, 470, 488, 512, 515, 570],
    }),
    (Graph3 = {
      labels: [0, 0.02, 0.04, 0.06, 0.08, 1, 1.2],
      datapoints: [0, 480, 520, 560, 602, 535],
    }),
    (Graph4 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
  ],
  currGr: null,
  delete: function () {
    this.ctxBox.style.display = "none";
    this.currGr.destroy();
  },
  view: function (num, left, top, height = null, width = null) {
    if (height != null) this.ctxBox.style.height = height + "px!important";
    if (width != null) this.ctxBox.style.width = width + "px!important";
    this.ctxBox.style.left = left + "px";
    this.ctxBox.style.top = top + "px";
    this.ctxBox.style.display = "block";
    this.currGr = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.graphs[num].labels,
        datasets: [
          {
            label: "Engineering Stress-Strain Curve",
            data: this.graphs[num].datapoints,
            borderWidth: 1,
            tension: 0.4,
          },
          // {
          //   label: "_",
          //   data: [0, 470],
          //   borderWidth: 1,
          // },
        ],
      },
      options: {
        borderWidth: 3,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this;
  },
};

Quiz.init();

// for restriction on next button ;
let isPerformNext = false;

// animation is running
let isRunning = false;
// to set isProcessRunning and also sync the progressbar + drawer
// ! and toggle the next btn active / deactive
function toggleNextBtn() {
  let nextBtn = document.querySelector(".btn-next");
  nextBtn.classList.toggle("btn-deactive");
}

const cancelSpeech = () => {
  window.speechSynthesis.cancel();
  ccQueue = [];
};

const setIsProcessRunning = (value) => {
  // calling toggle the next
  if (value != isRunning) {
    toggleNextBtn();
  }

  isRunning = value;
  if (value) {
    Dom.useTogglePointerEventsHere(false);
    cancelSpeech();
    Dom.hideAll();
  }
};

// global for document object
const get = (query) => {
  return document.querySelector(query);
};

const getAll = (query) => {
  return document.querySelectorAll(query);
};

const show = (ele, disp = "block", opa = 1) => {
  ele.style.display = disp;
  ele.style.opacity = opa;
};
const opacity = (ele, val = 1) => {
  ele.style.opacity = val;
};
const hide = (ele, disp = "none") => {
  ele.style.display = disp;
};
const hideAll = (elesName, disp = "none") => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    hide(ele);
  }
};
const showAll = (elesName, disp = "none", opa = 1) => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    show(ele, "block", opa);
  }
};

const set = (ele, l = null, t = null) => {
  if (l !== null) {
    ele.style.left = l + "px";
  }
  if (t !== null) {
    ele.style.top = t + "px";
  }
  show(ele);
};

let student_name = "";
// let currentDateGlobal = "";

// ! text to audio

const textToSpeach = (text, speak = true) => {
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.voice = window.speechSynthesis.getVoices()[0];
  if (isMute || !speak) {
    utterance.volume = 0;
    utterance.rate = 10;
  }
  window.speechSynthesis.speak(utterance);
  return utterance;
};

//queue for
let ccQueue = [];
// for subtitile
let ccObj = null;
function setCC(text = null, speed = 25, speak = true) {
  if (ccObj != null) {
    ccObj.destroy();
  }

  let ccDom = get(".steps-subtitle .subtitle");
  ccQueue.push(text);
  ccObj = new Typed(ccDom, {
    strings: ["", ...ccQueue],
    typeSpeed: speed,
    onStringTyped() {
      ccQueue.shift();
      // if(ccQueue.length != 0){
      //   setCC(ccQueue.shift())`
      // }
    },
  });
  let utterance = textToSpeach(text, speak);
  return utterance;
}

class Dom {
  constructor(selector) {
    this.item = null;
    if (selector[0] == "." || selector[0] == "#") {
      this.item = get(selector);
    } else if (selector instanceof HTMLElement) {
      this.item = selector;
    } else {
      this.item = src.get(selector);
    }
    this.selector = selector;
    // push
  }
  getValue() {
    return this.item.attributes["value"].value;
  }
  setValue(val) {
    this.item.attributes["value"].value = val;
  }
  hidden() {
    return this.item.style.display == "none";
  }
  setContent(text) {
    this.item.innerHTML = text;
    return this;
  }
  zIndex(idx) {
    this.item.style.zIndex = idx;
    return this;
  }
  opacity(val = 1) {
    this.item.style.opacity = val;
    return this;
  }
  rotate(deg) {
    this.item.style.transform = `rotate(${deg}deg)`;
    return this;
  }
  addClass(className) {
    this.item.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.item.classList.remove(className);
    return this;
  }
  borderRadius(amount) {
    amount += "px";
    this.styles({
      borderRadius: amount,
    });
  }
  scale(val = 1) {
    this.item.style.scale = val;
    return this;
  }
  get() {
    return this.item;
  }
  left(leftPixel) {
    this.item.left = leftPixel + "px";
    return this;
  }
  set(
    left = null,
    top = null,
    height = null,
    width = null,
    bottom = null,
    right = null,
    disp = "block"
  ) {
    // coordinates
    this.left = left;
    this.top = top;
    this.bottom = bottom;
    this.right = right;
    this.height = height;
    this.width = width;
    this.item.style.opacity = 1;
    this.item.style.transform = "translateX(0) translateY(0)";

    if (this.left !== null) this.item.style.left = String(this.left) + "px";
    if (this.top !== null) this.item.style.top = String(this.top) + "px";
    if (this.bottom !== null)
      this.item.style.bottom = String(this.bottom) + "px";
    if (this.right !== null) this.item.style.right = String(this.right) + "px";
    if (this.height !== null)
      this.item.style.height = String(this.height) + "px";
    if (this.width !== null) this.item.style.width = String(this.width) + "px";
    this.show(disp);
    return this;
  }
  show(disp = "block") {
    //! push for every element
    this.push();

    this.item.style.display = disp;
    // this.opacity();
    return this;
  }
  hide() {
    this.item.style.display = "none";
    return this;
  }
  play(speed = 1) {
    this.item.play();
    this.item.playbackRate = speed;
    return this;
  }
  // for setting styles
  styles(props) {
    for (let property in props) {
      this.item.style[property] = props[property];
    }
    return this;
  }
  pointerEvents(eventName) {
    this.item.style.pointerEvents = eventName;
  }
  // * static elements/objects of anime
  static arrayOfAnimes = [];
  static arrayOfItems = [];
  static animePush(animeObj) {
    Dom.arrayOfAnimes.push(animeObj);
  }
  static resetAnimeItems() {
    Dom.arrayOfAnimes = [];
  }
  static hideAll() {
    //to empty the setCC
    setCC("");
    // to delete all content of content adder menu
    Scenes.items.contentAdderBox.setContent("");
    for (let i of Dom.arrayOfItems) {
      i.hide();
      i.opacity();
    }
    // * reset animes
    for (let i of Dom.arrayOfAnimes) {
      // to reset each anime after back btn pressed
      i.reset();
    }
    Dom.resetItems();
  }
  static resetItems() {
    Dom.arrayOfItems = [];
  }
  static useTogglePointerEvents = false;
  static useTogglePointerEventsHere(use = true) {
    if (use) {
      this.useTogglePointerEvents = true;
      this.togglePointerEvents();
    } else {
      let animeWindow = new Dom(".main-window");
      let animeHeader = new Dom(".anime-header");
      let animeFooter = new Dom(".anime-footer");
      let cd = getAll(".concept_development");
      let graph_boxes = getAll(".graph_box");
      cd.forEach((c) => {
        let cdd = new Dom(c);
        cdd.pointerEvents("all");
      });
      graph_boxes.forEach((gb) => {
        let g = new Dom(gb);
        g.pointerEvents("all");
      });
      this.isArrowBlinking = false;
      animeHeader.pointerEvents("all");
      animeFooter.pointerEvents("all");
      animeWindow.pointerEvents("all");
      this.useTogglePointerEvents = false;
    }
  }
  static isArrowBlinking = false;
  static togglePointerEvents() {
    if (!this.useTogglePointerEvents) {
      return;
    }
    let animeWindow = new Dom(".main-window");
    let animeHeader = new Dom(".anime-header");
    let animeFooter = new Dom(".anime-footer");

    animeHeader.pointerEvents("all");
    animeFooter.pointerEvents("all");

    if (this.isArrowBlinking) {
      animeWindow.pointerEvents("all");
    } else {
      animeWindow.pointerEvents("none");
    }
  }
  static setBlinkArrowRed(
    isX = true,
    left = null,
    top = null,
    height = 30,
    width = null,
    rotate = 0
  ) {
    let blinkArrow = new Dom(".blinkArrowRed")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000);
    if (isX === -1) {
      this.isArrowBlinking = false;
      this.togglePointerEvents();
      blinkArrow.hide();
      return;
    }
    if (isX === -2) {
      blinkArrow.show();
      return;
    }
    this.isArrowBlinking = true;
    this.togglePointerEvents();
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  static setBlinkArrow(
    isX = true,
    left = null,
    top = null,
    height = 60,
    width = 60,
    rotate = 0
  ) {
    // because we added the blinkArrow image out of the anime-main
    top += 130;
    let blinkArrow = new Dom(".blinkArrow")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  push() {
    if (this.selector != ".anime-header") Dom.arrayOfItems.push(this);
    return this;
  }
  forMathematicalExpressionBtn = 0;
}

// * for cursor pointer
function cursorPointer(ele) {
  ele.style.cursor = "pointer";
}

// Img.setBlinkArrow(true,790,444).play();

const Scenes = {
  // ! To Plot graph
  plotGraph(
    ctx,
    graphIdx,
    startEmpty = false,
    xLabel = "",
    yLabel = "",
    data = [],
    dataLabel = "",
    beginAtZero = true
  ) {
    // save xy label in scence
    Scenes.items.chart.label[graphIdx].y = yLabel;
    Scenes.items.chart.label[graphIdx].x = xLabel;
    // for label
    Scenes.items.yLabel.set(520, 269).setContent("india india").styles({
      backgroundColor: "transperant",
      textAlign: "center",
      color: "black",
      width: "213px",
      rotate: "-90deg",
      zIndex: 10,
    });
    Scenes.items.xLabel.set(736, 386).setContent("india india").styles({
      backgroundColor: "transperant",
      color: "black",
      width: "fit-content",
      zIndex: 10,
    });

    // ! Destroy old graph
    let graphRef = Scenes.items.chart.graph[graphIdx];
    if (graphRef != null) {
      graphRef.destroy();
    }

    // temprory dataset
    let datasets = [
      {
        label: dataLabel,
        fill: false,
        borderColor: "red",
        backgroundColor: "red",
        data: data,
        display: false,
      },
    ];

    if (startEmpty) {
      datasets = [];
    }

    graphRef = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: yLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: xLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
        },
      },
    });

    Scenes.items.chart.graph[graphIdx] = graphRef;
    return graphRef;
  },

  // for adding new datasets to graph
  graphFeatures: {
    addDataset(chart, label, bgColor, data) {
      chart.data.datasets.push({
        label: label,
        fill: false,
        borderColor: bgColor,
        backgroundColor: bgColor,
        data: data,
      });
      chart.update();
    },
    addData(chart, index, data) {
      console.log(data);
      if (data.length > 0) {
        chart.data.datasets[index].data = data;
      } else {
        chart.data.datasets[index].data.push(data);
      }
      chart.update();
    },
    getSizeOfDatasets(chart) {
      return chart.data.datasets.length;
    },
  },
  items: {
    anime_main_dom: new Dom(".anime-main"),
    arrowRound: new Dom("arrowRound"),
    blinkArrow: new Dom("blinkArrow"),
    larrow: new Dom("laerrow"),
    larrow2: new Dom("laerrow2"),
    logo: new Dom("logo"),
    man: new Dom("man"),
    arrow: new Dom("measurearrow"),
    arrow2: new Dom("measurearrow2"),
    redsize: new Dom("redsize"),
    speech_off_btn: new Dom("speech_off_btn"),
    speech_on_btn: new Dom("speech_on_btn"),
    talk_cloud: new Dom("talk_cloud"),
    projectIntro: new Dom(".project-intro"),
    header: new Dom(".anime-header"),
    stepHeading: new Dom(".step-heading"),
    stepTitle: new Dom(".step-title"),
    stepDescription: new Dom(".step-description"),
    tableCalc: new Dom(".measurements"),
    tempText: new Dom(".temp-text"),
    tempText2: new Dom(".temp-text2"),
    tempInputBox: new Dom(".temp-input"),
    tempInputBoxInput: new Dom(".temp-input #ipnum"),
    tempInputT1: new Dom(".temp-input .text1"),
    tempInputT2: new Dom(".temp-input .text2"),
    tempInputError: new Dom(".temp-input .error"),
    tempInputBtn: new Dom(".temp-input .submit-btn"),
    utmBtn: new Dom(".utm-button"),
    inputWindow: new Dom(".user-input"),
    resultTable: new Dom(".result-table"),
    certificate: new Dom(".certificate"),
    welcomeBox: new Dom(".welcome-box"),
    videoBox: new Dom(".video-box"),
    videoBoxSrc: new Dom(".video-box .video"),
    videoBoxTitle: new Dom(".video-box .title"),
    videoBoxRestartBtn: new Dom(".video-box .controls .restart"),
    imageBox: new Dom(".image-box"),
    imageBoxSrc: new Dom(".image-box .image"),
    imageBoxTitle: new Dom(".image-box .title"),
    tempTitle1: new Dom(".temp-title1"),
    tempTitle2: new Dom(".temp-title2"),
    tempTitle3: new Dom(".temp-title3"),
    tempTitle4: new Dom(".temp-title4"),
    tempTitle5: new Dom(".temp-title5"),
    tempTitle6: new Dom(".temp-title6"),
    tempTitle7: new Dom(".temp-title7"),
    tempTitle8: new Dom(".temp-title8"),
    tempTitle9: new Dom(".temp-title9"),
    tempTitle10: new Dom(".temp-title10"),
    tempTitle11: new Dom(".temp-title11"),
    tempTitle12: new Dom(".temp-title12"),
    tempTitle13: new Dom(".temp-title13"),
    tempTitle14: new Dom(".temp-title14"),
    tempTitle15: new Dom(".temp-title15"),
    tempTitle16: new Dom(".temp-title16"),
    tempTitle17: new Dom(".temp-title17"),
    tempTitle18: new Dom(".temp-title18"),
    tempTitle19: new Dom(".temp-title19"),
    tempTitle20: new Dom(".temp-title20"),
    tempTitle21: new Dom(".temp-title21"),
    tempTitle22: new Dom(".temp-title22"),
    tempTitle23: new Dom(".temp-title23"),
    tempTitle24: new Dom(".temp-title24"),
    tempTitle25: new Dom(".temp-title25"),
    tempTitle26: new Dom(".temp-title26"),
    tempTitle27: new Dom(".temp-title27"),
    tempTitle28: new Dom(".temp-title28"),
    tempTitle29: new Dom(".temp-title29"),
    tempTitle30: new Dom(".temp-title30"),
    tempTitle31: new Dom(".temp-title31"),
    tempTitle32: new Dom(".temp-title32"),
    tempTitle33: new Dom(".temp-title33"),
    tempTitle34: new Dom(".temp-title34"),
    tempTitle35: new Dom(".temp-title35"),
    tempTitle36: new Dom(".temp-title36"),
    tempTitle37: new Dom(".temp-title37"),
    tempTitle38: new Dom(".temp-title38"),
    tempTitle39: new Dom(".temp-title39"),
    tempTitle40: new Dom(".temp-title40"),
    tempTitle41: new Dom(".temp-title41"),
    tempTitle42: new Dom(".temp-title42"),
    tempTitle43: new Dom(".temp-title43"),
    tempTitle44: new Dom(".temp-title44"),
    tempTitle45: new Dom(".temp-title45"),
    tempTitle46: new Dom(".temp-title46"),
    tempTitle47: new Dom(".temp-title47"),
    tempTitle48: new Dom(".temp-title48"),
    tempTitle49: new Dom(".temp-title49"),
    tempTitle50: new Dom(".temp-title50"),
    tempTitle51: new Dom(".temp-title51"),
    tempTitle52: new Dom(".temp-title52"),
    tempTitle53: new Dom(".temp-title53"),
    tempTitle54: new Dom(".temp-title54"),
    tempTitle55: new Dom(".temp-title55"),
    tempTitle56: new Dom(".temp-title56"),
    tempTitle57: new Dom(".temp-title57"),
    tempTitle58: new Dom(".temp-title58"),
    tempTitle59: new Dom(".temp-title59"),
    tempTitle60: new Dom(".temp-title60"),

    contentAdderBox: new Dom(".content-adder-box"),
    btn_save: new Dom(".btn-save"),
    btn_next: new Dom(".btn-next"),

    //!images of previous experiment

    part3_table_one: new Dom(".part3_table_one"),
    part3_table_two: new Dom(".part3_table_two"),
    part3_table_three: new Dom(".part3_table_three"),
    part3_table_three_two: new Dom(".part3_table_three_two"),
    part3_table_four: new Dom(".part3_table_four"),
    part3_table_four_2: new Dom(".part3_table_four_2"),
    slider_vIn: new Dom(".slider_vIn"),
    slider_D: new Dom(".slider_D"),
    slider_R: new Dom(".slider_R"),
    slider_box: new Dom(".universal-slider"),

    graph0: new Dom(".graph0"),
    graph1: new Dom(".graph1"),
    graph2: new Dom(".graph2"),
    graph3: new Dom(".graph3"),
    graph4: new Dom(".graph4"),
    graph5: new Dom(".graph5"),
    graph6: new Dom(".graph6"),
    graph7: new Dom(".graph7"),
    graph8: new Dom(".graph8"),
    graph9: new Dom(".graph9"),
    graph10: new Dom(".graph10"),
    graph_box_0: new Dom(".graph_box0"),
    graph_box_1: new Dom(".graph_box1"),
    graph_box_2: new Dom(".graph_box2"),
    graph_box_3: new Dom(".graph_box3"),
    graph_box_4: new Dom(".graph_box4"),
    graph_box_5: new Dom(".graph_box5"),
    graph_box_6: new Dom(".graph_box6"),
    graph_box_7: new Dom(".graph_box7"),
    graph_box_8: new Dom(".graph_box8"),
    graph_box_9: new Dom(".graph_box9"),
    graph_box_10: new Dom(".graph_box10"),
    xLabel: new Dom(".xLabel"),
    yLabel: new Dom(".yLabel"),
    xLabel2: new Dom(".xLabel2"),
    yLabel2: new Dom(".yLabel2"),

    concept_development_1: new Dom(".concept_development_1"),
    concept_development_2: new Dom(".concept_development_2"),
    concept_development_3: new Dom(".concept_development_3"),
    concept_development_4: new Dom(".concept_development_4"),

    btn_delete: new Dom(".btn-delete"),
    btn_reset: new Dom(".btn-reset"),

    btn_check_connections: new Dom(".btn-check-connections"),
    btn_circuit_diagram: new Dom(".btn-circuit-diagram"),

    // Theory

    // theory image removed

    btn_transparent: new Dom(".btn-transparent"),

    // ! Procedure formula Nomenclature images

    formulas_component_stress: new Dom("formulas_component_stress"),
    formulas_efficiency: new Dom("formulas_efficiency"),
    formulas_ideal: new Dom("formulas_ideal"),
    formulas_nomenclautre: new Dom("formulas_nomenclautre"),
    formulas_non_ideal: new Dom("formulas_non_ideal"),
    formulas_procedure: new Dom("formulas_procedure"),
    formulas_universal: new Dom("formulas_universal"),

    // ! Procedure formula Nomenclature images end

    // EE2 images added
    btn_reset_connections: new Dom(".btn-connections"),
    btn_reset_connections: new Dom(".btn-connections"),
    btn_reset_connections: new Dom(".btn-connections"),

    //! EE19 images added

    alpha_value: new Dom("alpha_value"),
    box_img: new Dom("box_img"),
    btn_delete: new Dom("btn_delete"),
    btn_record: new Dom("btn_record"),
    btn_reset: new Dom("btn_reset"),
    circuit_rl_load: new Dom("circuit_rl_load"),
    circuit_r_load: new Dom("circuit_r_load"),
    component_d1: new Dom("component_d1"),
    component_transformer: new Dom("component_transformer"),
    component_voltage: new Dom("component_voltage"),
    graph_bcg: new Dom("graph_bcg"),
    grpah_bcg: new Dom("grpah_bcg"),
    option_1: new Dom("option_1"),
    option_2: new Dom("option_2"),
    option_3: new Dom("option_3"),
    part_1_circuit: new Dom("part_1_circuit"),
    part_1_correct_text: new Dom("part_1_correct_text"),
    part_1_text_pink: new Dom("part_1_text_pink"),
    part_1_text_red: new Dom("part_1_text_red"),
    part_2_select_option: new Dom("part_2_select_option"),
    part_3_circuit: new Dom("part_3_circuit"),
    part_4_1: new Dom("part_4_1"),
    part_4_2: new Dom("part_4_2"),
    part_4_3: new Dom("part_4_3"),
    rl_load_a_green: new Dom("rl_load_a_green"),
    rl_load_text: new Dom("rl_load_text"),
    rl_load_v_blue: new Dom("rl_load_v_blue"),
    rl_load_v_brown: new Dom("rl_load_v_brown"),
    rl_load_v_red: new Dom("rl_load_v_red"),
    rl_value: new Dom("rl_value"),
    r_load_a_blur: new Dom("r_load_a_blur"),
    r_load_a_green_graph: new Dom("r_load_a_green_graph"),
    r_load_text: new Dom("r_load_text"),
    r_load_v_blue: new Dom("r_load_v_blue"),
    r_load_v_blue_graph: new Dom("r_load_v_blue_graph"),
    r_load_v_brown: new Dom("r_load_v_brown"),
    r_load_v_brown_graph: new Dom("r_load_v_brown_graph"),
    r_load_v_red: new Dom("r_load_v_red"),
    r_load_v_red_graph: new Dom("r_load_v_red_graph"),
    tab_1: new Dom("tab_1"),
    tab_1f: new Dom("tab_1f"),
    tab_2: new Dom("tab_2"),
    tab_2f: new Dom("tab_2f"),
    tab_3: new Dom("tab_3"),
    tab_3f: new Dom("tab_3f"),
    tab_4: new Dom("tab_4"),
    tab_4f: new Dom("tab_4f"),
    tab_5: new Dom("tab_5"),
    tab_5f: new Dom("tab_5f"),
    tab_6: new Dom("tab_6"),
    tab_6f: new Dom("tab_6f"),
    tab_7: new Dom("tab_7"),
    tab_7f: new Dom("tab_7f"),
    tab_8: new Dom("tab_8"),
    tab_8f: new Dom("tab_8f"),
    tab_alpha: new Dom("tab_alpha"),
    tab_alpha_vs: new Dom("tab_alpha_vs"),
    vac_value: new Dom("vac_value"),

    // copied components
    component_d2: new Dom("component_d2"),
    component_d3: new Dom("component_d3"),
    component_d4: new Dom("component_d4"),
    btn_check: new Dom("btn_check"),
    graph_bcg_2: new Dom("graph_bcg_2"),
    graph_bcg_3: new Dom("graph_bcg_3"),
    graph_bcg_4: new Dom("graph_bcg_4"),
    arrow_red: new Dom("arrow_red"),
    arrow_green: new Dom("arrow_green"),
    arrow_brown: new Dom("arrow_brown"),
    arrow_blue: new Dom("arrow_blue"),
    graph_helper_1: new Dom("graph_helper_1"),
    graph_helper_2: new Dom("graph_helper_2"),
    graph_helper_3: new Dom("graph_helper_3"),
    graph_helper_4: new Dom("graph_helper_4"),
    helper_1: new Dom("helper_1"),
    helper_2: new Dom("helper_2"),
    btn_hint: new Dom("btn_hint"),
    hint_box: new Dom("hint_box"),

    //!EE19 images end here

    //! EE15 tables
    table_resistance: new Dom(".table_resistance"),
    table_inductor: new Dom(".table_inductor"),
    table_ripple_factor: new Dom(".table_ripple_factor"),

    concept_development: new Dom(".concept_development"),

    // ! new items dom
    domQs1: new Dom("domQs1"),
    domQs2: new Dom("domQs2"),
    domQs3: new Dom("domQs3"),
    domQs4: new Dom("domQs4"),
    domQs5: new Dom("domQs5"),
    domQs6: new Dom("domQs6"),

    chart: {
      graph: [
        (graph1 = null),
        (graph2 = null),
        (graph3 = null),
        (graph4 = null),
        (graph5 = null),
        (graph6 = null),
        (graph7 = null),
        (graph8 = null),
        (graph9 = null),
        (graph10 = null),
        (graph11 = null),
      ],
      label: [
        (label1 = {
          x: "Label 2",
          y: "Label 1",
        }),
        (label2 = {
          x: "Label 2",
          y: "Label 1",
        }),
        (label3 = {
          x: "Label 2",
          y: "Label 1",
        }),
        (label4 = {
          x: "Label 2",
          y: "Label 1",
        }),
        (label5 = {
          x: "Label 2",
          y: "Label 1",
        }),
        (label6 = {
          x: "Label 2",
          y: "Label 1",
        }),
        (label7 = {
          x: "Label 2",
          y: "Label 1",
        }),
        (label8 = {
          x: "Label 2",
          y: "Label 1",
        }),
        (label9 = {
          x: "Label 2",
          y: "Label 1",
        }),
        (label10 = {
          x: "Label 2",
          y: "Label 1",
        }),
        (label11 = {
          x: "Label 2",
          y: "Label 1",
        }),
      ],
    },
  },
  GraphRefs: [],
  // delete it, it is for step helper
  EE19AlreadySeleted: 1, // todo update to 1
  EE19GraphValues: {
    "70": {

    }
  },
  deleteAll() { 
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },
  hideStepHeading(){
    Scenes.items.stepHeading.styles({visibility: "hidden"})
  },
  // for typing hello text
  intru: null,
  intruVoice: null,
  optionsDone: [0, 0, 0, 0],
  steps: [
    (intro = () => {
      // remove all dom element for back and setProcessRunning
      setIsProcessRunning(true);

      // starting elements

      // subtitle
      setTimeout(() => {
        setCC("Enter your name and click on 'Start' to start the experiment");
      }, 500);
      Scenes.items.header.set(0, 120).show("flex");
      let inputWindow = get(".user-input");
      show(inputWindow, "flex");
      let man = new Dom("man").set(650, 80).push();

      let submitBtn = get("#nameSubmitBtn");
      submitBtn.onclick = () => {
        student_name = get("#stuName").value;
        let error = get(".user-input .error");
        // todo remove comment
        if (student_name.trim() == "") {
          show(error);
          return;
        }
        // take only first space
        let fName = student_name.slice(0, student_name.indexOf(" "));
        hide(error);
        let tl = anime.timeline({
          easing: "easeOutExpo",
          duration: 1000,
        });
        tl.add({
          targets: ".anime-header",
          top: 0,
        })
          .add({
            targets: ".user-input",
            opacity: 0,
          })
          .add({
            targets: man.item,
            translateX: -280,
          })
          .add({
            targets: Scenes.items.talk_cloud.item,
            begin() {
              // Scenes.items.tempText.innerHTML = `👋 Hey!<br>${fName}`;
              Scenes.items.tempText.item.style.fontWeight = "bold";
              // show(Scenes.items.tempText);
              intru = new Typed(Scenes.items.tempText.item, {
                strings: ["", `Hey!👋<br>${fName}`],
                typeSpeed: 25,
              });
              Scenes.items.tempText.set(482, 1);
              textToSpeach(`Hey! ${fName}`);
              textToSpeach(
                "Welcome to Foundation Wall in Foamwork Experiment of Foamwork Technology in Civil Engineering Virtual Lab developed by Prof. K. N. Jha, Department of Civil Engineering, IIT Delhi."
              );
              Scenes.items.talk_cloud.set(450, -40, 180).push();
              setCC("");
            },
            endDelay: 2000,
            opacity: [0, 1],
          })
          .add({
            begin() {
              // to hide previous step images
              intru.destroy();
              Dom.hideAll();
              Scenes.items.welcomeBox.show("flex");
            },
          })
          .add({
            duration: 12000,
            complete() {
              setCC("Click 'Next' to go to next step");
              Dom.setBlinkArrow(true, 790, 444).play();
              setIsProcessRunning(false);
            },
          });
      };
      return true;
    }),
    //! concept development
    (concept_dev_step1 = function () {
      setIsProcessRunning(true);
      Dom.hideAll();
      // require
      Scenes.items.slider_box.hide();

      let btn_transparent = Scenes.items.btn_transparent.set().item;

      Scenes.items.concept_development_1.set().styles({
        zIndex: "5000",
        scale: "1 0.915",
        top: "-144px",
        position: "absolute",
      });
      let src_path = "./iframes/step1/index.html";
      Scenes.items.concept_development_1.item.src = src_path;
      // remove other iframes
      function removeIframes() {
        let safeIdx = 0;
        let cds = getAll(".concept_development");
        cds.forEach((cd, idx) => {
          if (idx != safeIdx) {
            cd.src = "";
          }
        });
      }
      removeIframes();
      // ! Slide ended enable the button next button
      function checkIsSlideEnded() {
        let isSlideEnded = JSON.parse(localStorage.getItem("isSlideEnded"));
        if (isSlideEnded == true) {
          btn_transparent.disabled = false;
          setIsProcessRunning(false);
          btn_transparent.classList.remove("btn-disabled");
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrowRed(true, 866, 420, 30, null, -90).play();
          btn_transparent.onclick = () => {
            Scenes.next();
            localStorage.setItem("isSlideEnded", false);
            window.clearInterval(interval);
            btn_transparent.classList.add("btn-disabled");
            btn_transparent.disabled = true;
          };
        }
      }
      var interval = window.setInterval(checkIsSlideEnded, 1000);

      return true;
    }),
     
    //! Circuit formulation part1
    (step2 = function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide();
      Dom.setBlinkArrow(-1);
      Scenes.items.btn_next.show();
      Scenes.items.btn_transparent.set().hide();
      Scenes.items.slider_box.hide();

      setCC("Click on the component and place it to its appropriate position by connecting the wires.");

      let vertexBox = new Dom(".vertex-box");
      vertexBox.show();

      //! Required positions
      Scenes.items.part_1_circuit.set(130 - 80 + 45, 113, 339);

      Scenes.items.component_voltage.set(67 , -31, 102);
      Scenes.items.component_transformer.set(152 + 10, -20, 74);
      Scenes.items.component_d1.set(20 + 279, -15, 68);
      Scenes.items.component_d2.set(20 + 279 + 80, -15, 68);
      Scenes.items.component_d3.set(20 + 279 + 80 + 80, -15, 68);
      Scenes.items.component_d4.set(20 + 279 + 80 + 80 + 80, -15, 68);

      // Scenes.items.box_img.set(46, -41, 125);

      Scenes.items.btn_check.set(808, -40, 36).zIndex(1);
      Scenes.items.btn_reset.set(808, 0, 36).zIndex(1);

      Scenes.items.part_1_correct_text.set(630, 84, 76).hide()
      Scenes.items.part_1_text_red.set(630, 171, 81).hide()
      Scenes.items.part_1_text_pink.set(630, 264, 153).hide()

      //! hint button code
      Scenes.items.btn_hint.set(808, 4 + 36, 36).zIndex(1)
      Scenes.items.hint_box.set(188, 52, 322).zIndex(1).hide()

     let hint_btn = Scenes.items.btn_hint;
      hint_btn.item.onmouseenter = ()=>{
        Scenes.items.hint_box.show()
      }
      hint_btn.item.onmouseout = ()=>{
        Scenes.items.hint_box.hide()
      }

      //correct positions of the components
      // Scenes.items.component_voltage.set(166-80, 222, 102)
      // Scenes.items.component_transformer.set(217-80, 235, 74)
      // Scenes.items.component_d1.set(410.5-80, 114, 68)

      let us = {
        color: "#993366",
        fontSize: "1.2rem",
        textAlign: "left",
        fontStyle: "",
      };
      // Scenes.items.tempTitle16.setContent("Connect the device terminal to the bridge terminals to form 1-phase bridge inverter.").set(714, 29, null, 198).styles(us).zIndex(20000)

      // connected vertex src and dest
      let allConnectedVertexSrcDest = {};

      function isConnectionsRight(isConnectionsCorrect) {
        let imgToShow = null;
        if (isConnectionsCorrect) {
          Scenes.items.tempTitle16.hide();
          setCC("Well Done, This is 'single-phase bridge inverter'");

          // * destroy all the connection
          Scenes.items.btn_reset.item.click();
          getAll(".jtk-endpoint").forEach((ele) => {
            ele.style.display = "none";
          });
          let switches = [
            Scenes.items.component_d1.zIndex(1),
            Scenes.items.component_d2.zIndex(1),
            Scenes.items.component_d3.zIndex(1),
            Scenes.items.component_d4.zIndex(1),
          ];
          // ! swtich for different places
          // * diodes
          function setSwitchOnDifferentPlaces() {
            let edges = allConnectedVertexSrcDest;
            let tempSwitches = new Array(...switches);
            let defaultIdxSrc = {
              7: 0,
              9: 1,
              11: 2,
              13: 3,
            };
            let defaultIdxDest = {
              21: 0,
              23: 1,
              25: 2,
              27: 3,
            };
            // ! suffling the array index according to connection
            switches[defaultIdxDest[edges[7]]] = tempSwitches[defaultIdxSrc[7]];
            switches[defaultIdxDest[edges[9]]] = tempSwitches[defaultIdxSrc[9]];
            switches[defaultIdxDest[edges[11]]] = tempSwitches[defaultIdxSrc[11]];
            switches[defaultIdxDest[edges[13]]] = tempSwitches[defaultIdxSrc[13]];
          }
          setSwitchOnDifferentPlaces();
          let components = [
            Scenes.items.component_voltage.zIndex(1),
            Scenes.items.component_transformer.zIndex(1),
            ...switches,
          ];
          let left_pxs = [86 + 45, 137 + 45, 330.5 + 45, 410.2 + 45, 330.6 + 45, 410.6 + 45];
          let top_pxs = [222, 235, 138, 138, 330, 330];

          // send to final position of compos
          let anim = anime.timeline({
            duration: 1200,
            easing: "easeInOutQuad",
          });
          for (let i in left_pxs) {
            let complete = () => {};
            if (i == left_pxs.length - 1) {
              complete = () => {
                let opa = 0.4
                anime({
                  targets: Scenes.items.part_1_correct_text.set(null).item,
                  scale: [1, 1.1],
                  opacity: [opa, 1],
                  loop: 5,
                  duration: 500,
                  complete(){
                    Scenes.items.part_1_text_red.set()
                    anime({
                      targets: Scenes.items.part_1_text_red.item,
                      opacity: [opa, 1],
                      easing: "easeInOutQuad",
                      loop: 5,
                      complete(){
                        Scenes.items.part_1_text_pink.set()
                        anime({
                          targets: Scenes.items.part_1_text_pink.item,
                          opacity: [opa, 1],
                          easing: "easeInOutQuad",
                          loop: 5,
                          complete() {
                            setCC("Click 'Next' to go to next step");
                            Dom.setBlinkArrow(true, 790, 415).play();
                            setIsProcessRunning(false);
                          },
                        })
                      }
                    })
                  }
                })
                  
              };
            }
            anim.add({
              targets: components[i].item,
              left: left_pxs[i],
              top: top_pxs[i],
              complete: complete,
            });
          }
        } else {
          setCC("Incorrect connections, try again");
          let st = {
            color: "red",
            backgroundColor: "white",
            display: "block",
            width: "153px",
            height: "fit-content",
            padding: "10px",
            fontSize: "23px",
          };
          let msg = Scenes.items.tempTitle30
            .set(23, 313)
            .setContent("Incorrect Connections, try again!")
            .styles(st);
          anime({
            targets: msg.item,
            duration: 1000,
            opacity: [0, 1],
            loop: 2,
            easing: "linear",
            complete() {
              setTimeout(() => {
                $(msg.item).hide("fast");
                Dom.setBlinkArrowRed(-1);
              }, 4000);
            },
          });
          Dom.setBlinkArrowRed(true, 885, 10, 30, null, 90).play();
        }
      }

      Scenes.items.slider_box.hide();

      // ! JSPLumb cable
      function cable() {
        Scenes.items.btn_check.item.onclick = checkCableConnection;
        // ! connections array contains connected idxs
        // ! initializing the checkgraph for connections
        let matricesForCheckGraph = [];
        // ! connection is right/wrong
        let isConnectionRight = false;
        // set graph
        function fillCheckGraph() {
          //* to fill element in array
          function create2DArray(rows, cols, initValue) {
            filledArray = new Array(rows);

            for (let i = 0; i < rows; i++) {
              filledArray[i] = new Array(cols);

              for (let j = 0; j < cols; j++) {
                filledArray[i][j] = initValue;
              }
            }
            return filledArray;
          }

          // fill zero
          let noOfVertex = 28;
          noOfVertex++
          matricesForCheckGraph = create2DArray(noOfVertex, noOfVertex, 0);

          //* for multiple connection switches point
          let xSwitchAxis = [7, 9, 11, 13];
          let ySwitchAxis = [8, 10, 12, 14];
          let xSwitchPosAxis = [21, 23, 25, 27];
          let ySwitchPosAxis = [22, 24, 26, 28];

          let xEdge = [xSwitchAxis, ySwitchAxis];
          let yEdge = [xSwitchPosAxis, ySwitchPosAxis];
          for (let edge_idx in xEdge) {
            for (let x_edge of xEdge[edge_idx]) {
              for (let y_edge of yEdge[edge_idx]) {
                matricesForCheckGraph[x_edge][y_edge] = 1;
                matricesForCheckGraph[y_edge][x_edge] = 1;
              }
            }
          }
          //* fixed connection is filled
          let xAxisFixed = [1, 2, 3, 4, 5, 6];
          let yAxisFixed = [15, 16, 17, 18, 19, 20]; 
          for (let i in xAxisFixed) {
            matricesForCheckGraph[xAxisFixed[i]][yAxisFixed[i]] = 1;
            matricesForCheckGraph[yAxisFixed[i]][xAxisFixed[i]] = 1;
          }

          // console.log(matricesForCheckGraph)
        }
        fillCheckGraph();

        // ! check
        function checkCableConnection() {
          // console.log("sneha")
          // console.log("sneha")
          // if (connections.length == 0) {
          //   alert("Please make the connections first");
          //   return false;
          // }
          let minimumConnectionsLength = 14;
          if (connections.length < minimumConnectionsLength) {
            setCC("Connect all the terminals first");
            return false;
          }
          if (connections.length >= minimumConnectionsLength) {
            // ! listDiv contains vertexConnectionsName
            // eg vertex10, vertex23
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId, connections[j].sourceId];
              listDiv.push(pos);
            }

            // ! Main logic for hecking graph
            for (let i = 0; i < listDiv.length; i++) {
              // * to convert div to idx only
              function convertDivtextToIdx(divText) {
                let convertedText = "";
                let text = divText.substr(-2);
                let num1 = text[0];
                let num2 = text[1];
                if (!isNaN(num1)) convertedText += num1;
                if (!isNaN(num2)) convertedText += num2;
                return parseInt(convertedText);
              }
              // substr is so i can extract the number from the id
              let vertexSrcIdx = convertDivtextToIdx(listDiv[i][0]);
              let vertexDestIdx = convertDivtextToIdx(listDiv[i][1]);

              // saving value as object key:value src:dest
              var minVertexSrcIdx = Math.min(vertexSrcIdx, vertexDestIdx);
              var maxVertexDestIdx = Math.max(vertexSrcIdx, vertexDestIdx);

              allConnectedVertexSrcDest[minVertexSrcIdx] = maxVertexDestIdx;
            }

            // ! Matched Graph
            let isGraphMatched = false;
            // ! check graph condition is matched or not
            function forCheckGraphIsMatched() {
              var destFor = allConnectedVertexSrcDest;
              for (let src in destFor) {
                src = Number(src);
                let dest = destFor[src];
                console.log("src:", src, "dest:", dest);
                // * match with graph
                if (!matricesForCheckGraph[src][dest]) {
                  isGraphMatched = false;
                  return;
                }
                let src_1 = Number();
                let src_2 = Number();
                // ODD
                if (src & 1) {
                  src_1 = src;
                  src_2 = src + 1;
                  if (destFor[src_2] == destFor[src_1] + 1) {
                    isGraphMatched = true;
                  } else {
                    isGraphMatched = false;
                    return;
                  }
                }
                // EVEN
                else {
                  src_1 = src;
                  src_2 = src - 1;
                  if (destFor[src_2] == destFor[src_1] - 1) {
                    isGraphMatched = true;
                  } else {
                    isGraphMatched = false;
                    return;
                  }
                }
                // delete destFor[src_1]
                // delete destFor[src_2]
              }
            }
            console.log(allConnectedVertexSrcDest, isGraphMatched);
            forCheckGraphIsMatched();

            // ! for right connection note
            if (isGraphMatched) {
              isConnectionsRight(true);
            } else {
              // ! for wrong connection
              // alert("Wrong Connections, try again.")
              isConnectionsRight(false);
              allConnectedVertexSrcDest = [];
            }
          }
        }
        // checkCableConnection()
        (showConnectionInfo = function (listDiv) {}),
          (hideConnectionInfo = function (listDiv) {
            listDiv.style.display = "none";
          }),
          (connections = []),
          (updateConnections = function (conn, remove) {
            if (!remove) {
              connections.push(conn);
              // ! show blink when all vertex are connected
              // todo change size 4 to 13
              if (connections.length == 14) {
                Dom.setBlinkArrowRed(true, 765, -36, 30, null, 180).play();
              }
            } else {
              var idx = -1;
              for (var i = 0; i < connections.length; i++) {
                if (connections[i] == conn) {
                  idx = i;
                  break;
                }
              }
              if (idx != -1) connections.splice(idx, 1);
            }
            if (connections.length > 0) {
              var listDiv = [];
              for (var j = 0; j < connections.length; j++) {
                let pos = [connections[j].targetId, connections[j].sourceId];
                listDiv.push(pos);
                // todo remove
                if(j == connections.length - 1){
                  console.log(pos)
                }
              }
              showConnectionInfo(listDiv);
            }
          });

        jsPlumb.ready(function () {
          var instance = jsPlumb.getInstance();

          // suspend drawing and initialise.
          instance.batch(function () {
            // bind to connection/connectionDetached events, and update the list of connections on screen.
            instance.bind("connection", function (info, originalEvent) {
              updateConnections(info.connection);
            });
            instance.bind("connectionDetached", function (info, originalEvent) {
              updateConnections(info.connection, true);
            });

            instance.bind("connectionMoved", function (info, originalEvent) {
              //  only remove here, because a 'connection' event is also fired.
              // in a future release of jsplumb this extra connection event will not
              // be fired.
              updateConnections(info.connection, true);
            });

            // configure some drop options for use by all endpoints.
            var exampleDropOptions = {
              tolerance: "touch",
              hoverClass: "dropHover",
              activeClass: "dragActive",
            };

            // ! for setting up the endpoints
            function setEndPoint(maxConnections = 1) {
              let radius = 8;
              let endPointStyleData = {
                endpoint: ["Dot", { radius: radius }],
                paintStyle: { fill: "#c00000" },
                isSource: true,
                scope: "green",
                connectorStyle: { stroke: "#c00000", strokeWidth: 6 },
                connector: ["Bezier", { curviness: -60 }],
                maxConnections: maxConnections,
                isTarget: true,
                dropOptions: exampleDropOptions,
              };
              return endPointStyleData;
            }

            var exampleEndpoint1 = setEndPoint();
     

            function addEndPoints() {
              // connections that are fixed

              //conn 1 
              instance.addEndpoint(
                "vertex1",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex15",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 2
              instance.addEndpoint(
                "vertex2",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex16",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              
              //conn 3
              instance.addEndpoint(
                "vertex3",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex17",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              
              //conn 4
              instance.addEndpoint(
                "vertex4",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex18",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              
              //conn 5
              instance.addEndpoint(
                "vertex5",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex19",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              
              //conn 5
              instance.addEndpoint(
                "vertex6",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex20",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );




              // remaining
      
          
              instance.addEndpoint(
                "vertex7",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex8",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex9",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex10",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex11",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex12",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex13",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex14",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
             

              
              instance.addEndpoint(
                "vertex21",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex22",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex23",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex24",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex25",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex26",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex27",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex28",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
          
           
            }
            addEndPoints();

            /*instance.addEndpoint("vertex9", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex10", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex11", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);
            instance.addEndpoint("vertex12", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);*/

            instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

            var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
            instance.on(hideLinks, "click", function (e) {
              instance.toggleVisible(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
            instance.on(dragLinks, "click", function (e) {
              var s = instance.toggleDraggable(this.getAttribute("rel"));
              this.innerHTML = s ? "disable dragging" : "enable dragging";
              jsPlumbUtil.consume(e);
            });

            var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
            instance.on(detachLinks, "click", function (e) {
              instance.deleteConnectionsForElement(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            // ! reset
            instance.on(Scenes.items.btn_reset.item, "click", function (e) {
              // instance.detachEveryConnection();
              instance.deleteEveryConnection();
              showConnectionInfo("");
              jsPlumbUtil.consume(e);
              Dom.setBlinkArrowRed(-1);
            });
          });

          jsPlumb.fire("jsPlumbDemoLoaded", instance);
        });
      }

      // calling cable function
      cable();

      // ------ end

      return true;
    }),

    //! concept development 2
    (concept_dev_step2 = function () {
      // ! destroy connection
      Scenes.items.btn_reset.item.click();
      getAll(".jtk-endpoint").forEach((ele) => {
        ele.style.display = "none";
      });

      setIsProcessRunning(true);
      Dom.hideAll();
      // require
      Scenes.items.slider_box.hide();

      let btn_transparent = Scenes.items.btn_transparent.set().item;

      Scenes.items.concept_development_2.set().styles({
        zIndex: "5000",
        scale: "1 0.915",
        top: "-144px",
        position: "absolute",
      });
      let src_path = "./iframes/step3/index.html";
      Scenes.items.concept_development_2.item.src = src_path;
      // remove other iframes
      function removeIframes() {
        let safeIdx = 1;
        let cds = getAll(".concept_development");
        cds.forEach((cd, idx) => {
          if (idx != safeIdx) {
            cd.src = "";
          }
        });
      }
      removeIframes();

      // ! Slide ended enable the button next button
      function checkIsSlideEnded() {
        let isSlideEnded = localStorage.getItem("isSlideEnded");
        if (isSlideEnded == "true") {
          btn_transparent.disabled = false;
          setIsProcessRunning(false);
          btn_transparent.classList.remove("btn-disabled");
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrowRed(true, 866, 420, 30, null, -90).play();
          btn_transparent.onclick = () => {
            // Scenes.steps[5]()
            Dom.hideAll();
            Scenes.next();
            localStorage.setItem("isSlideEnded", false);
            window.clearInterval(interval);
            btn_transparent.classList.add("btn-disabled");
            btn_transparent.disabled = true;
          };
        }
      }
      var interval = window.setInterval(checkIsSlideEnded, 1000);

      return true;
    }),

    //! select option
    (step4 = function () {
      setIsProcessRunning(true);
      Scenes.items.btn_next.show();

      // todo all previous elements hide
      Dom.hideAll();

      // ! destroy connection
      // Scenes.items.btn_reset.item.click()
      getAll(".jtk-endpoint").forEach((ele) => {
        ele.style.display = "none";
      });
      Scenes.items.contentAdderBox.item.innerHTML = "";
      // Scenes.changeHeader(2, -235, 28)

      // Scenes.setStepHeading("Step-3", "Performance Analysis.");
      // setCC("Select any one, to show the performance of controlled bridge rectifier either with R-load or RL-load.")

      // * remove all previous restrictions

      // ! Required Elements

      Scenes.items.part_2_select_option.set(91, -12, 421);
      Scenes.items.option_1.set(336, -7, 132).zIndex(4);
      Scenes.items.option_2.set(336, 136, 132).zIndex(3);
      Scenes.items.option_3.set(336, 273, 131).zIndex(3);

      // // hide the slider
      Scenes.items.slider_box.hide();

      // hide all tables
      // Scenes.items.part3_table_one.hide()
      // Scenes.items.part3_table_two.hide()
      Scenes.items.part3_table_three.hide();
      // Scenes.items.part3_table_four.hide()
      // Scenes.items.part3_table_four_2.hide()

      // active all sliders

      // * showing right tick if done
      // for(let i in rightTicks){
      //   if(Scenes.optionsDone[i] == 1){
      //     rightTicks[i].show()
      //   }
      // }

      // resetSliderValue()
      // ! Final Position
      //  Scenes.items.tableCalc.show()

      // ! onclicks for all options
      let options = [Scenes.items.option_1, Scenes.items.option_2, Scenes.items.option_3];

      // ! Destroy Graphs
      function destroyGraphs() {
        for (let i = 0; i < 7; i++) {
          if (Scenes.items.chart[i] != null) {
            Scenes.items.chart[i].destroy();
          }
        }
      }
      // destroyGraphs()

      //! RESET ALL THE SLIDER VALUES
      // sliders.reset()
      Scenes.forMathematicalExpressionBtn = 0;

      const opOne = () => {
        Scenes.optionsDone[0] = 1;
        Scenes.forMathematicalExpressionBtn = 1;
        Scenes.currentStep = 4;
        Scenes.steps[5]();
        // Scenes.next()
      };
      const opTwo = () => {
        Scenes.optionsDone[1] = 1;
        Scenes.forMathematicalExpressionBtn = 2;
        Scenes.currentStep = 7;
        Scenes.steps[6]();
        // Scenes.next()
      };
      const opThree = () => {
        Scenes.optionsDone[2] = 1;
        Scenes.forMathematicalExpressionBtn = 2;
        Scenes.currentStep = 9;
        Scenes.steps[8]();
        // Scenes.next()
      };
      // const opThree = ()=>{

      //   Scenes.optionsDone[2]=1;
      //   Scenes.forMathematicalExpressionBtn = 3
      //   Scenes.steps[6]()
      // }

      options[0].item.onclick = opOne;
      // rightTicks[0].item.onclick = opOne

      options[1].item.onclick = opTwo;
      // rightTicks[1].item.onclick = opTwo

      options[2].item.onclick =  opThree
      // rightTicks[2].item.onclick = opThree

      // ! if all options done then exit
      // Scenes.optionsDone[1] = 1
      let exit = true;
      for (let i = 0; i < 3; i++) {
        if (Scenes.optionsDone[i] == 0) {
          exit = false;
          break;
        }
      }

      if (exit) {
        // after complete
        // Dom.setBlinkArrow(true, 790, 408).play();
        setCC("Simulation Done");
        setIsProcessRunning(false);
        return true;
      }

      setCC(
        "Select any one, to show the performance of controlled bridge rectifier either with R-load or RL-load."
      );
      return true;
    }),


    //! option 1 - principle of operation

    //! option 1 Controlled Bridge Rectifier with R-Load : Principle of Operation
    (concept_dev_step3 = function () {
      setIsProcessRunning(true);
      Dom.hideAll();
      // require
      Scenes.items.slider_box.hide();

      let btn_transparent = Scenes.items.btn_transparent.set().item;

      Scenes.items.concept_development_3.set().styles({
        zIndex: "5000",
        scale: "1 0.915",
        top: "-144px",
        position: "absolute",
      });
      let src_path = "./iframes/step5/index.html";
      Scenes.items.concept_development_3.item.src = src_path;
      // remove other iframes
      function removeIframes() {
        let safeIdx = 2;
        let cds = getAll(".concept_development");
        cds.forEach((cd, idx) => {
          if (idx != safeIdx) {
            cd.src = "";
          }
        });
      }
      removeIframes();

      // ! Slide ended enable the button next button
      function checkIsSlideEnded() {
        let isSlideEnded = localStorage.getItem("isSlideEnded");
        if (isSlideEnded == "true") {
          btn_transparent.disabled = false;
          setIsProcessRunning(false);
          btn_transparent.classList.remove("btn-disabled");
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrowRed(true, 866, 420, 30, null, -90).play();
          btn_transparent.onclick = () => {
            Scenes.next();
            localStorage.setItem("isSlideEnded", false);
            window.clearInterval(interval);
            btn_transparent.classList.add("btn-disabled");
            btn_transparent.disabled = true;
          };
        }
      }
      var interval = window.setInterval(checkIsSlideEnded, 1000);

      return true;
    }),


    //! option 2 - waveforms

    //! option 2 Controlled Bridge Rectifier with R-Load : Steady-state Waveforms
    (step7 = function () {
      setIsProcessRunning(true);

      // Dom.setBlinkArrowRed(true,160,320,30,30,-90).play()
      Scenes.items.btn_next.show();
      Scenes.items.slider_box.hide();

      //! Required items
      let items = Scenes.items;

      items.circuit_r_load.set(301, 87, 202);
      items.r_load_text.set(368, 314, 125);

      anime({
        targets: items.r_load_text.item,
        scale: "1.1",
        duration: 800,
        loop: true,
        easing: "linear"
      })


      items.r_load_v_red.set(267, 157, 78);
      items.r_load_a_blur.set(331, 144, 37);
      items.r_load_v_brown.set(347, 79, 85);
      items.r_load_v_blue.set(581, 141, 85);

      let red = [
        items.r_load_v_red_graph
          .set(9, -36 + 28, 141)
          .zIndex(1)
          .hide(),
        items.graph_bcg.set(8, -37 + 28, 151, 290).hide(),
        items.graph_helper_1.set(26, 20, 103, 267).zIndex(2).hide(),
        items.arrow_red.set(125, 129, 70).hide(),
      ];

      let green = [
        items.r_load_a_green_graph
          .set(10, 268 + 10, 144)
          .zIndex(1)
          .hide(),
        items.graph_bcg_2.set(9, 265 + 10, 152, 329).hide(),
        items.graph_helper_2.set(42, 300, 115, 289).zIndex(2).hide(),
        items.arrow_green.set(299, 170, 120).hide(),
      ];

      let brown = [
        items.r_load_v_brown_graph.set(647, -36, 185).zIndex(1).hide(),
        items.graph_bcg_3.set(643, -36, 191, 295).hide(),
        items.graph_helper_3.set(683, -21, 163, 249).zIndex(2).hide(),
        items.arrow_brown.set(398, 43, 78).hide(),
      ];

      let blue = [
        items.r_load_v_blue_graph
          .set(630, 268 - 20, 144)
          .zIndex(1)
          .hide(),
        items.graph_bcg_4.set(625, 270 - 20, 154, 312).hide(),
        items.graph_helper_4.set(670, 277, 106, 260).zIndex(2).hide(),
        items.arrow_blue.set(634, 187, 78).hide(),
      ];

      let helpers = [
        items.graph_helper_1.set(26, 20, 103, 267).zIndex(2).hide(),
        items.graph_helper_2.set(42, 300, 115, 289).zIndex(2).hide(),
        items.graph_helper_3.set(683, -21, 163, 249).zIndex(2).hide(),
        items.graph_helper_4.set(670, 277, 106, 260).zIndex(2).hide(),
      ];

      let widths = [267, 289, 249, 260];
      let graphs = [
        items.r_load_v_red_graph
          .set(9, -36 + 28, 141)
          .zIndex(1)
          .hide(),
        items.r_load_a_green_graph
          .set(10, 268 + 10, 144)
          .zIndex(1)
          .hide(),
        items.r_load_v_brown_graph.set(647, -36, 185).zIndex(1).hide(),
        items.r_load_v_blue_graph
          .set(630, 268 - 20, 144)
          .zIndex(1)
          .hide(),
      ];
      let compo = [
        items.r_load_v_red.set(267, 157, 78),
        items.r_load_a_blur.set(331, 144, 37),
        items.r_load_v_brown.set(347, 79, 85),
        items.r_load_v_blue.set(581, 141, 85),
      ];

      compo.forEach((ele) => {
        ele.styles({ cursor: "pointer" });
        ele.item.onmouseenter = () => {
          anime({
            targets: ele.item,
            scale: 1.1,
            duration: 500,
            easing: "easeInOutQuad",
          });
        };
        ele.item.onmouseout = () => {
          anime({
            targets: ele.item,
            scale: 1,
            duration: 500,
            easing: "easeInOutQuad",
          });
        };
      });

      function remove(target, w) {
        return anime({
          targets: target.item,
          translateX: w,
          width: 0,
          duration: 2000,
          easing: "easeInOutQuad",
        });
      }

      let clickCountIdx = 0;
      let isCompClick = [0, 0, 0, 0];

      compo[0].item.onclick = () => {
        isCompClick[0] = 1;
        //to show the corresponding graph
        red.forEach((ele) => {
          ele.show();
        });
        setCC("Here, the nature of ac input  voltage waveform is shown.");
        remove(helpers[0], widths[0]);
        graphs[0].show();
        clickCountIdx++;
        check();
      };
      compo[1].item.onclick = () => {
        isCompClick[1] = 1;
        //to show the corresponding graph
        green.forEach((ele) => {
          ele.show();
        });
        setCC(
          "Here, the ac input current waveform is shown.  the value of inductor decides the smoothness of the waveform and it can be a perfect square wave."
        );
        remove(helpers[1], widths[1]);
        graphs[1].show();
        clickCountIdx++;
        check();
      };
      compo[2].item.onclick = () => {
        isCompClick[2] = 1;
        //to show the corresponding graph
        brown.forEach((ele) => {
          ele.show();
        });

        setCC(
          "Here, the voltage appearing across thyristor one and current through it is shown."
        );
        remove(helpers[2], widths[2]);
        graphs[2].show();
        clickCountIdx++;
        check();
      };
      compo[3].item.onclick = () => {
        isCompClick[3] = 1;
        //to show the corresponding graph
        blue.forEach((ele) => {
          ele.show();
        });

        setCC(
          "Here, the load voltage and load current waveforms with RL  load is shown. "
        );
        setCC(
          " Based on the firing angle of the gate terminal,the thyristors start conducting and  voltage and current waveforms across load obtained."
        );

        remove(helpers[3], widths[3]);
        graphs[3].show();
        clickCountIdx++;
        check();
      };

      function check() {
        if (isCompClick.indexOf(0) == -1) {
          compo.forEach((ele) => {
            ele.item.onmouseenter = () => {};
            ele.item.onclick = () => {};
          });
          setIsProcessRunning(false);
          setCC(" Click 'Next' to go next step");
        }
      }

      return true;
    }),
    //! option 2 Controlled Bridge Rectifier with RL-Load : Steady-state Waveforms
    (step8 = function () {
      setIsProcessRunning(true);

      // Dom.setBlinkArrowRed(true,160,320,30,30,-90).play()
      Scenes.items.btn_next.show();
      Scenes.items.slider_box.hide();

      //! Required items
      let items = Scenes.items;

      items.circuit_rl_load.set(301, 87, 202);
      items.rl_load_text.set(368, 314, 125);

      anime({
        targets: items.rl_load_text.item,
        scale: "1.1",
        duration: 800,
        loop: true,
        easing: "linear"
      })

      let red = [
        items.r_load_v_red
          .set(9, -36 + 28, 141)
          .zIndex(1)
          .hide(),
        items.graph_bcg.set(8, -37 + 28, 151, 290).hide(),
        items.graph_helper_1.set(26, 20, 103, 267).zIndex(2).hide(),
        items.arrow_red.set(125, 129, 70).hide(),
      ];

      let green = [
        items.rl_load_a_green
          .set(10, 268 + 10, 144)
          .zIndex(1)
          .hide(),
        items.graph_bcg_2.set(9, 265 + 10, 152 + 11, 329).hide(),
        items.graph_helper_2.set(42, 300, 115, 289).zIndex(2).hide(),
        items.arrow_green.set(299, 170, 120).hide(),
      ];

      let brown = [
        items.rl_load_v_brown.set(647, -36, 185).zIndex(1).hide(),
        items.graph_bcg_3.set(643, -36, 191, 295).hide(),
        items.graph_helper_3.set(683, -21, 163, 249).zIndex(2).hide(),
        items.arrow_brown.set(398, 43, 78).hide(),
      ];

      let blue = [
        items.rl_load_v_blue
          .set(630, 268 - 20, 144)
          .zIndex(1)
          .hide(),
        items.graph_bcg_4.set(625, 250 - 10, 208, 312).hide(),
        items.graph_helper_4.set(670, 277, 106, 260).zIndex(2).hide(),
        items.arrow_blue.set(634, 187 - 10, 78).hide(),
      ];

      let helpers = [
        items.graph_helper_1.set(26, 20, 103, 267).zIndex(2).hide(),
        items.graph_helper_2
          .set(42, 300, 115 + 11, 289)
          .zIndex(2)
          .hide(),
        items.graph_helper_3.set(683, -21, 163, 249).zIndex(2).hide(),
        items.graph_helper_4.set(667, 266, 172, 260).zIndex(2).hide(),
      ];

      let widths = [267, 289, 249, 260];
      let graphs = [
        items.rl_load_v_red
          .set(9, -36 + 28, 141)
          .zIndex(1)
          .hide(),
        items.rl_load_a_green
          .set(10, 268 + 10, 144 + 11)
          .zIndex(1)
          .hide(),
        items.rl_load_v_brown.set(647, -36, 185).zIndex(1).hide(),
        items.rl_load_v_blue
          .set(630, 248 - 10, 206)
          .zIndex(1)
          .hide(),
      ];
      let compo = [
        items.r_load_v_red.set(267, 157, 78),
        items.r_load_a_blur.set(331, 144, 37),
        items.r_load_v_brown.set(347, 79, 85),
        items.r_load_v_blue.set(575, 135, 112),
      ];

      compo.forEach((ele) => {
        ele.styles({ cursor: "pointer" });
        ele.item.onmouseenter = () => {
          anime({
            targets: ele.item,
            scale: 1.1,
            duration: 500,
            easing: "easeInOutQuad",
          });
        };
        ele.item.onmouseout = () => {
          anime({
            targets: ele.item,
            scale: 1,
            duration: 500,
            easing: "easeInOutQuad",
          });
        };
      });

      function remove(target, w) {
        return anime({
          targets: target.item,
          translateX: w,
          width: 0,
          duration: 2000,
          easing: "easeInOutQuad",
        });
      }

      let clickCountIdx = 0;
      let isCompClick = [0, 0, 0, 0];

      compo[0].item.onclick = () => {
        isCompClick[0] = 1;
        //to show the corresponding graph
        red.forEach((ele) => {
          ele.show();
        });
        setCC("Here, the nature of ac input  voltage waveform is shown.");
        remove(helpers[0], widths[0]);
        graphs[0].show();
        clickCountIdx++;
        check();
      };

      compo[1].item.onclick = () => {
        isCompClick[1] = 1;
        //to show the corresponding graph
        green.forEach((ele) => {
          ele.show();
        });
        setCC(
          "Here, the ac input current waveform is shown.  the value of inductor decides the smoothness of the waveform and it can be a perfect square wave."
        );
        remove(helpers[1], widths[1]);
        graphs[1].show();
        clickCountIdx++;
        check();
      };
      compo[2].item.onclick = () => {
        isCompClick[2] = 1;
        //to show the corresponding graph
        brown.forEach((ele) => {
          ele.show();
        });

        setCC(
          "Here, the voltage appearing across thyristor one and current through it is shown."
        );
        remove(helpers[2], widths[2]);
        graphs[2].show();
        clickCountIdx++;
        check();
      };
      compo[3].item.onclick = () => {
        isCompClick[3] = 1;
        //to show the corresponding graph
        blue.forEach((ele) => {
          ele.show();
        });

        setCC(
          "Here, the load voltage and load current waveforms with RL  load is shown. "
        );
        setCC(
          " Based on the firing angle of the gate terminal,the thyristors start conducting and  voltage and current waveforms across load obtained."
        );

        remove(helpers[3], widths[3]);
        graphs[3].show();
        clickCountIdx++;
        check();
      };

      function check() {
        if (isCompClick.indexOf(0) == -1) {
          compo.forEach((ele) => {
            ele.item.onmouseenter = () => {};
            ele.item.onclick = () => {};
          });
          Scenes.currentStep = 4;
          setIsProcessRunning(false);
          setCC(" Click 'Next' to go next step");
        }
      }

      return true;
    }),



    //! option 3 - simulation

    (step9 = function () {
      Dom.hideAll();
      // optionsDone
      setIsProcessRunning(true);
      // Dom.useTogglePointerEventsHere()
      Scenes.items.btn_next.show();
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "",
        ""
      )
      Scenes.hideStepHeading()
      // ! show the slider
      let d_max = 72
      sliders.d_max = d_max
      Scenes.items.slider_box.set(0, -80).show("flex")
      sliders.resetSlidersValue()
      sliders.showAllSliders()
      // sliders.showSliderFor(2)
      //!new added for EE8
      Scenes.items.part3_table_three_two.set(5, 160)
      sliders.active("d")
      sliders.active("v")

      //* to set the styling of conclusion front
      // let conclusionFront = "Here, the load voltage waveform is shown. The load voltage ripple is reduced after connecting the C-filter"
      // Scenes.items.tempTitle1.set(null, -74, null, 393).setContent(conclusionFront).addClass("conclusion").zIndex(2000).item

      // Max firing angle
      Scenes.items.tempTitle26.setContent("0°").set(530,44).styles({color: "black"})
      Scenes.items.tempTitle27.setContent(`180°`).set(590,6).styles({color: "black", zIndex: "1000", fontSize: "10px"})

      Scenes.items.tab_alpha.set(700, -85, 78)
      Scenes.items.tab_alpha_vs.set(725, -39, 49)
      Scenes.items.tab_1.set(620, -27 + 14, 102).zIndex(3)
      Scenes.items.tab_2.set(620+75, -27 + 10, 107).zIndex(3)
      Scenes.items.tab_3.set(620+75+75, -27 + 10, 107).zIndex(3)
      Scenes.items.tab_4.set(620+75+75+75, -27 + 10, 107).zIndex(3)
      Scenes.items.tab_5.set(620, 46 + 10, 114).zIndex(3)
      Scenes.items.tab_6.set(620+75, 46 + 10, 114).zIndex(3)
      Scenes.items.tab_7.set(620+75+75, 46 + 10, 114).zIndex(3)
      Scenes.items.tab_8.set(620+75+75+77, 46 + 10, 114).zIndex(3)

      Scenes.items.tab_1f.set(620, -27 + 14, 102).zIndex(3).hide()
      Scenes.items.tab_2f.set(620+75, -27 + 10, 107).zIndex(3).hide()
      Scenes.items.tab_3f.set(620+75+75, -27 + 10, 107).zIndex(3).hide()
      Scenes.items.tab_4f.set(620+75+75+75, -27 + 10, 107).zIndex(3).hide()
      Scenes.items.tab_5f.set(620, 46 + 10, 114).zIndex(3).hide()
      Scenes.items.tab_6f.set(620+75, 46 + 10, 114).zIndex(3).hide()
      Scenes.items.tab_7f.set(620+75+75, 46 + 10, 114).zIndex(3).hide()
      Scenes.items.tab_8f.set(620+75+75+77, 46 + 10, 114).zIndex(3).hide()

      Scenes.items.grpah_bcg.set(610, 152, 262, 333)
      // Scenes.items.alpha_value.set(0,0,30)
      Scenes.items.vac_value.set(26, 75, 77).zIndex(300000)
      Scenes.items.rl_value.set(283, 79, 55)
      Scenes.items.part_3_circuit.set(371, -75,143)

      Scenes.items.btn_record.set(8, 387, 29)
      Scenes.items.btn_reset.set(8+100, 387, 29)
      Scenes.items.btn_delete.set(8+100+100, 387, 29)

      let vAC1 = 70,
      vAC2 = 150,
      vAC3 = 220

      let vACS = [vAC1, vAC2, vAC3]

      let stTemp = {
        zIndex: 300001,
        fontSize: "15px",
        color: "red",
      }
      let vAC1TempTitle = Scenes.items.tempTitle30.setContent(`${vAC1}°`).set(83,80).styles(stTemp).hide()
      let vAC2TempTitle = Scenes.items.tempTitle31.setContent(`${vAC2}°`).set(83,104).styles(stTemp).hide()
      let vAC3TempTitle = Scenes.items.tempTitle32.setContent(`${vAC3}°`).set(83,129).styles(stTemp).hide()
    
      // Scenes.items.btn_plot.set(698+20, 360, 35).zIndex(2)

      let valuesToMatch = [];

      let table = new Dom(".part3_table_three_two").item;
      let recordBtnClickIdx = table.tBodies[0].rows[6].cells[2].innerHTML == "" ? 0 : 7;

      switch(Scenes.EE19AlreadySeleted){
        case 2:
          vAC1TempTitle.show()
          break
        case 3:
          vAC1TempTitle.show()
          vAC2TempTitle.show()
          break
      }

      // ! Tutorial Function
      // Dom.setBlinkArrowRed(true,0,0,30,null,-90)
      function stepTutorial2(){
        setCC("Here, first set AC input voltage")
        Dom.setBlinkArrowRed(true,60,-45,30,null,-90).play()
        
        // v onclick
        sliders.v_knob.onclick = ()=>{
          Dom.setBlinkArrowRed(true,400,12,30,null,90).play()
          setCC("Change the firing angle")
          
          switch(Scenes.EE19AlreadySeleted){
            case 1:
              sliders.v.value = vAC1
              vAC1TempTitle.show()
              break
            case 2:
              sliders.v.value = vAC2
              vAC1TempTitle.show()
              vAC2TempTitle.show()
              break
            case 3:
              sliders.v.value = vAC3
              vAC1TempTitle.show()
              vAC2TempTitle.show()
              vAC3TempTitle.show()
              break
          }
          // to update knob according to input
          sliders.v.onkeyup()

          Scenes.items.tempTitle26.setContent(`${d_max}°`)
          Scenes.items.tempTitle27.setContent(`${d_max}°`)

          // d onclick
          sliders.d.onclick = ()=>{
            Dom.setBlinkArrowRed(true,35,352,30,null,-90).play()
            setCC("Press Record")
          }
          
        }

      }
      if (recordBtnClickIdx == 0) {
        // Dom.setBlinkArrowRed(true,730,11,30,null,90)
        stepTutorial2();
      }

      // ! graph
      // let graph_width = 346
      // let graph_height = 273

      let graph_width = 307
      let graph_height = 236

      // let graph_box_height = 295
      // let graph_box_top = 60

      let graph_box_left = 612
      let graph_box_top = 154
      let graph_box_height = 258
      let graph_box_width = 329
      let dataLabelX = "Firing Angle (α)" 
      
      // ! Forshowing dummy graph
      Scenes.items.graph_box_0
        .set(graph_box_left, graph_box_top, graph_box_height, graph_box_width)
        .zIndex(5);
      Scenes.items.graph0.set(null, null, graph_height, graph_width);
      let ctx = Scenes.items.graph0.item;
      let dummyGraphIdx = 10;
      // graph idx is for  showing which graph is being shown
      let graphIdx = 0;
      // * showing the dummy graph
      function showDummyGraph(zidx = 10) {
        // if(forceShow || Scenes.items.chart.graph[dummyGraphIdx]==null){
        //   Scenes.items.graph_box_0.set()
        //   Scenes.plotGraph(ctx,dummyGraphIdx,true,dataLabelX,"")
        // }
        Scenes.items.graph_box_0.zIndex(zidx);
      }
      showDummyGraph();

      // ! To Plot graph
      function plotGraphs() {
        let ctxs = {
          graph_box: [
            Scenes.items.graph_box_1
              .set(
                graph_box_left,
                graph_box_top,
                graph_box_height,
                graph_box_width
              )
              .zIndex(5),
            Scenes.items.graph_box_2
              .set(
                graph_box_left,
                graph_box_top,
                graph_box_height,
                graph_box_width
              )
              .zIndex(5),
            Scenes.items.graph_box_3
              .set(
                graph_box_left,
                graph_box_top,
                graph_box_height,
                graph_box_width
              )
              .zIndex(5),
            Scenes.items.graph_box_4
              .set(
                graph_box_left,
                graph_box_top,
                graph_box_height,
                graph_box_width
              )
              .zIndex(5),
            Scenes.items.graph_box_5
              .set(
                graph_box_left,
                graph_box_top,
                graph_box_height,
                graph_box_width
              )
              .zIndex(5),
            Scenes.items.graph_box_6
              .set(
                graph_box_left,
                graph_box_top,
                graph_box_height,
                graph_box_width
              )
              .zIndex(5),
            Scenes.items.graph_box_7
              .set(
                graph_box_left,
                graph_box_top,
                graph_box_height,
                graph_box_width
              )
              .zIndex(5),
            Scenes.items.graph_box_8
              .set(
                graph_box_left,
                graph_box_top,
                graph_box_height,
                graph_box_width
              )
              .zIndex(5),
          ],
          graph: [
            Scenes.items.graph1.set(null, null, graph_height, graph_width).item,
            Scenes.items.graph2.set(null, null, graph_height, graph_width).item,
            Scenes.items.graph3.set(null, null, graph_height, graph_width).item,
            Scenes.items.graph4.set(null, null, graph_height, graph_width).item,
            Scenes.items.graph5.set(null, null, graph_height, graph_width).item,
            Scenes.items.graph6.set(null, null, graph_height, graph_width).item,
            Scenes.items.graph7.set(null, null, graph_height, graph_width).item,
            Scenes.items.graph8.set(null, null, graph_height, graph_width).item,
          ],
        };
        let data = {
          labels: [
            // ["Vdc"],
            // ["Idc"],
            // ["Vrms"],
            // ["Irms"],
            // ["P"],
            // ["DF"],
            // ["HF"],
            // ["PF"],
            ["Vac=70"],
            ["Vac=150"],
            ["Vac=220"]
          ],
          colors: [
            "#2f528f",
            "#7f6000",
            "#c00040"
          ],
          datas: [],
        };
        let yLabels = [
          "Average Load Voltage (volts)",
          "Average Load Current (amps)",
          "Load RMS voltage (volts)",
          "Load IRMS current (amps)",
          "Power (watts)",
          "Displacement factor (DF)",
          "Harmonic Factor (HF)",
          "Power Factor (PF)",
        ];
        function getDataFromTable() {
          let datas_XY = []; // v0,i0,p0,PF,THD
          let indexForTableColunmDataY = [
            [3],
            [4],
            [5],
            [6],
            [7],
            [11],
            [10],
            [12],
          ];
          let indexForTableColumnDataX = 2;
          indexForTableColunmDataY.forEach((col_idxs) => {
            let col_idxs_datas = [];
            col_idxs.forEach((col_idx) => {
              let rows = table.tBodies[0].rows;
              // get data from rows.cells
              let col_idx_datas = [];
              for (let row of rows) {
                let x = row.cells[indexForTableColumnDataX].innerHTML;
                let y = row.cells[col_idx].innerHTML;
                let data = { x, y };
                col_idx_datas.push(data);
              }
              // save data on datas_XY
              col_idxs_datas.push(col_idx_datas);
            });
            datas_XY.push(col_idxs_datas);
          });
          return datas_XY;
        }
        // table data to array conversion
        let datas_XY = getDataFromTable();
        data.datas = datas_XY;

        // ! set all data and plot graph but hide all or don't set
        // and active all click buttons
        function dataToGraphConversion() {
          ctxs.graph.forEach((ctx, idx) => {
            let stepIdx = Scenes.EE19AlreadySeleted - 1
            idx = idx;
            let xLabel = dataLabelX,
              yLabel = yLabels[idx],
              dataArrays = data.datas[idx],
              dataLabels = data.labels[stepIdx],
              dataColor = data.colors;

            let graphRef = null
            if(stepIdx == 0){
              // plot empty graph
              graphRef = Scenes.plotGraph(ctx, idx, true, xLabel, yLabel);
              Scenes.GraphRefs.push(graphRef)
            }else{
              graphRef = Scenes.GraphRefs[idx]
              Scenes.items.yLabel.show()
              Scenes.items.xLabel.show()
            }
            
            let first = 0;
            // let second = 1;
            // ! new data labels for EE19
            // dataLabels = ["Vac=70","Vac=150","Vac=220"]  
            let data_1 = {
              array: dataArrays[first],
              label: dataLabels[first],
              color: dataColor[stepIdx],
            };
            // let data_2 = {
            //   array: dataArrays[second],
            //   label: dataLabels[second],
            //   color: dataColor.second,
            // }
            console.log(`idx: ${idx} data: `)
            console.log(data_1.array)

            Scenes.graphFeatures.addDataset(
              graphRef,
              data_1.label,
              data_1.color,
              data_1.array
            );
            // Scenes.graphFeatures.addDataset(graphRef,data_2.label,data_2.color,data_2.array)
          });
          Scenes.items.yLabel.setContent("");
          Scenes.items.xLabel.setContent("");
        }
        dataToGraphConversion();

        // * graph tab btn onclick
        function btnGraphTab() {
          let subtitles = {
            lastButtonFunction: ()=>{
              if(Scenes.EE19AlreadySeleted < 3){
                Dom.setBlinkArrowRed(-1)
                setCC("The plot shows that the power factor is decreasing with increase in firing angle and is independent of input AC voltage variation.").onend = ()=>{
                  setCC("Click on 'Reset' to select different V<sub>ac</sub>")
                  Dom.setBlinkArrowRed(true,135,352,30,null,-90).play()
                }
              }else{
                setCC("The plot shows that the power factor is decreasing with increase in firing angle and is independent of input AC voltage variation.").onend = ()=>{
                  // Dom.setBlinkArrowRed(-1)
                  // setCC("Simulation Done");
                  // Scenes.currentStep = 5;
                  Dom.setBlinkArrow(true, 790, 544).play();
                  setIsProcessRunning(false);
                };
                // Scenes.currentStep = 4
              }
              Scenes.EE19AlreadySeleted++
            },
            arrows: [
              ()=>Dom.setBlinkArrowRed(true,722,65,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,798,65,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,874,65,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,640,138,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,722,138,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,798,138,30,null,90).play(),
              ()=>Dom.setBlinkArrowRed(true,874,138,30,null,90).play(),
            ],
            texts: [
              [
                "In controlled rectifier, the load voltage is adjustable with firing angle. The plot shows that the load voltage is decreasing with increase in firing angle. For firing angles greater than 90 degrees average load voltage becomes negative.",

                "The plot shows that the load current is decreasing with increase in firing angle.",

                "The plot shows RMS load voltage variation with firing angle and it is almost constant for three different AC input voltage settings.",

                "The plot shows that the RMS value of load current is decreasing with increase in firing angle for three different AC input voltage settings.",

                "The plot shows that the load power is decreasing with increase in firing angle for three different AC input voltage settings.",

                "The plot shows that the displacement factor is decreasing with increase in firing angle and is independent of input AC voltage variation.",

                "The harmonic factor is almost constant with firing angle.",
              ],
            ],
          };
          let btns = [
            Scenes.items.tab_1,
            Scenes.items.tab_2,
            Scenes.items.tab_3,
            Scenes.items.tab_4,
            Scenes.items.tab_5,
            Scenes.items.tab_6,
            Scenes.items.tab_7,
            Scenes.items.tab_8,
          ]

          let btnsf = [
            Scenes.items.tab_1f,
            Scenes.items.tab_2f,
            Scenes.items.tab_3f,
            Scenes.items.tab_4f,
            Scenes.items.tab_5f,
            Scenes.items.tab_6f,
            Scenes.items.tab_7f,
            Scenes.items.tab_8f,
          ]

          btns.forEach((btnObject,idx)=>{
            let btn = btnObject.item
            btn.onclick = () =>{
              // dummy graph by zindex
              showDummyGraph(1);
              // Scenes.items.part_5_tab1.styles({filter: "hue-rotate(158deg)"})
              // btn.style.filter = "hue-rotate(158deg)"

              //for labeling
              let conclusionFront = "";
              //* for conclusion
              switch (idx) {
                case 0:
                  conclusionFront =
                    "With R-load, the RMS output voltage ( V<sub>rms</sub>) is more as compared to average output voltage (V<sub>o</sub>).";
                  break;

                case 1:
                  conclusionFront =
                    "With R-load the I<sub>rms</sub> is more as compared to I<sub>o</sub> (average output current)";
                  break;

                case 2:
                  conclusionFront =
                    "The load power increases with increasing input ac source voltage.";
                  break;

                case 3:
                  conclusionFront =
                    "Here, the ripple factor and TUF are constant and they are independent of load.";
                  break;
              }
              // ! SHOW FRONT TEXT
              // Scenes.items.tempTitle1.set(null, -74, null, 393).setContent(conclusionFront).addClass("conclusion").zIndex(2000).item

              for (let gb of ctxs.graph_box) {
                gb.hide();
              }

              // * show current clicked graph and labels
              ctxs.graph_box[idx].show();
              if (idx < btns.length - graphIdx - 1) {
                Dom.setBlinkArrowRed(-1);
                // * text is 2d array where text is located
                if(Scenes.EE19AlreadySeleted < 3 && idx == 0){
                  setCC("In controlled rectifier, the load voltage is adjustable with firing angle. The plot shows that the load voltage is decreasing with increase in firing angle")
                  setCC("For firing angles greater than 90 degrees average load voltage becomes negative.").onend = ()=>{
                    subtitles.arrows[idx]()
                  }
                }
                else{
                  let subtitleArrayIdx = 0
                  setCC(subtitles.texts[subtitleArrayIdx][idx]).onend = ()=>{
                    subtitles.arrows[idx]()
                  }
                }
              }else{
                subtitles.lastButtonFunction()
              }
              let yLabel = Scenes.items.chart.label[idx].y
              Scenes.items.yLabel.setContent(yLabel)
              Scenes.items.xLabel.setContent(dataLabelX)

              // * show tabf and hide tab
              btnsf[idx].show()
              btnObject.hide()
            }

            btnsf[idx].item.onclick = btnObject.item.onclick
          })
        }
        btnGraphTab();
      }

      //* to check conclusion appearance
      // Scenes.items.tempTitle1.set(null, -74,108, 301 ).setContent("lorem20sdhs jfjdsf ajhs;as hdf asdlhf").addClass("conclusion").zIndex(2000).item

      // ! ------------> If data already present plot the graph
      // if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
      //   // setDataToGraph()=
      //     setIsProcessRunning(false)
      //     Scenes.currentStep  = 4

      //     recordBtnClickIdx = 21
      //     let r=7
      //     let tab=3
      //     // * to get old values from table for matching
      //     for(let i=0;i<tab;i++){
      //       let arr = []
      //       for(let j=0;j<r;j++){
      //         arr.push(Number(tablesBody[i].rows[j].cells[0].innerHTML))
      //       }
      //       valuesToMatch.push(arr)
      //     }

      //     disableSlider("r")
      //     disableSlider("v")
      //     setDataToGraph()
      // }else{
      //   plotGraph()
      // }

      //!onclick for delete btn
      Scenes.items.btn_delete.item.onclick = function () {
        if (recordBtnClickIdx == 0 || recordBtnClickIdx > 8) {
          return;
        }
        let rows = table.tBodies[0].rows;
        let n = rows[0].cells.length;

        for (let i = 1; i < n; i++) {
          rows[recordBtnClickIdx - 1].cells[i].innerHTML = "";
        }
        recordBtnClickIdx = recordBtnClickIdx - 1;
        if (recordBtnClickIdx == 0) {
          // disableSlider("reset")
        }
        valuesToMatch.pop()
      };

      //! onclick for reset
      Scenes.items.btn_reset.item.onclick = function () {
        var rows = table.tBodies[0].rows;
        let n = rows.length;
        let m = rows[0].cells.length;

        for (let i = 0; i < n; i++) {
          for (let j = 1; j < m; j++) {
            rows[i].cells[j].innerHTML = "";
          }
        }
        
        // reset all the parameters
        // so just simply call this step again
        // sliders.reset()
        // let tabs = [
        //   Scenes.items.part_5_tab1,
        //   Scenes.items.part_5_tab2,
        //   Scenes.items.part_5_tab3,
        //   Scenes.items.part_5_tab4,
        //   Scenes.items.part_5_tab5,
        // ]

        // tabs.forEach(tab=>{
        //   tab.styles({
        //     filter: "",
        //   })
        //   tab.item.onclick = ()=>{}
        // })
        sliders.v_knob.onclick = ()=>{}
        sliders.active("all");
        Scenes.steps[8]();
      };

      let currentTableIdx = 0;
      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){
        Dom.setBlinkArrowRed(-1)
        // for arrow system
        if(recordBtnClickIdx < 6){
          Dom.setBlinkArrowRed(true,400,12,30,null,90).play()
          setCC("Change the firing angle")
        }else if(recordBtnClickIdx < 7){
          Dom.setBlinkArrowRed(true,35,352,30,null,-90).play()
          setCC("Press record")
        }

        // dutyRatioValue/d is firing angle
        let vInValue = Number(sliders.v.value)
        let dutyRatioValue = Number(sliders.d.value)
        let inductanceValue = 10
        let resistanceValue = 1

        updateValues(vInValue, dutyRatioValue ,resistanceValue, inductanceValue)
        // ! Can't select same values
        let changableVal = dutyRatioValue
        let type = "firing angle" 
        if(recordBtnClickIdx < 7 && valuesToMatch.indexOf(changableVal)!=-1){
          setCC("Please set different " + type)
          return
        }else{
          valuesToMatch.push(changableVal)
        }

        // ! sort the data
        if (recordBtnClickIdx == 7) {

          function sortTable(){
            var rows = table.tBodies[0].rows
            let valueColumnToShort = 2
            
            let n = rows.length
            for(let i=0;i<n;i++){
              for(let j=0;j<n-i-1;j++){
                let val1 = Number(rows[j].cells[valueColumnToShort].innerHTML)
                let val2 = Number(rows[j+1].cells[valueColumnToShort].innerHTML)
                if(val1 > val2){
                    let temp = rows[j].innerHTML
                    rows[j].innerHTML = rows[j+1].innerHTML
                    rows[j+1].innerHTML = temp
                }
              }
            
            }
            for (let i = 0; i < n; i++) {
              rows[i].cells[0].innerHTML = i + 1;
            }
          }
          sortTable();
          // ! plot all graphs
          plotGraphs();

          // ! Graph Tab Buttons click
          function graphTabButtonArrows() {
            window.speechSynthesis.cancel();
            // conclusionFontAdd_1
            // ! ADD TEXT HERE
            // let text = "To see the average and rms load voltage variation with input ac voltage press the respective button."
            // Scenes.items.tempTitle1.set(null, -74, null, 393).setContent(text).addClass("conclusion").zIndex(2000).item
            // Dom.setBlinkArrowRed(-1)
            // setCC(text).onend = ()=>{
            // ! ADD ARROW HERE
            // Dom.setBlinkArrowRed(true,730,-29,30,null,90).play()
            Dom.setBlinkArrowRed(true,640,65,30,null,90).play()
          // }
            // refer to plotGraphs() area
          }
          graphTabButtonArrows();
          // after complete
          // Dom.setBlinkArrow(true, 790, 408).play()
          // setCC("Click 'Next' to go to next step")
          // setIsProcessRunning(false)
          // Scenes.currentStep = 4
        }

        // deactivate the sliders after first value  done
        // todo
        if (recordBtnClickIdx == 0) {
          // disableSlider("v")
          // disableSlider("d")
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++];
        // let FiringAngleValue = tableRow.cells[2].innerHTML
        tableRow.cells[1].innerHTML = vInValue;
        tableRow.cells[2].innerHTML = dutyRatioValue;
        tableRow.cells[3].innerHTML = Number(
          Formulas.rl_load.vdc(values)
        ).toFixed(2);
        tableRow.cells[4].innerHTML = Number(
          Formulas.rl_load.idc(values)
        ).toFixed(2);
        tableRow.cells[5].innerHTML = Number(
          Formulas.rl_load.vrms(values)
        ).toFixed(2);
        tableRow.cells[6].innerHTML = Number(
          Formulas.rl_load.irms(values)
        ).toFixed(2);
        tableRow.cells[7].innerHTML = Number(
          Formulas.rl_load.power(values)
        ).toFixed(2);
        tableRow.cells[8].innerHTML = Number(
          Formulas.rl_load.is(values)
        ).toFixed(2);
        tableRow.cells[9].innerHTML = Number(
          Formulas.rl_load.is1(values)
        ).toFixed(2);
        tableRow.cells[10].innerHTML = Number(
          Formulas.rl_load.hf(values)
        ).toFixed(2);
        // tableRow.cells[11].innerHTML = Number(Formulas.rl_load.df(values)).toFixed(2)
        // tableRow.cells[11].innerHTML = 10

        //! 11th cell is not responding
        tableRow.cells[12].innerHTML = Number(
          Formulas.rl_load.df(values)
        ).toFixed(2);
        tableRow.cells[13].innerHTML = Number(
          Formulas.rl_load.pf(values)
        ).toFixed(2);

        // console.log(tableRow.cells[13])
        // console.log("last cell", Number(Formulas.rl_load.pf(values)).toFixed(2))

        // added a display none column

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})

        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false);
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        if (recordBtnClickIdx == 7) {
          setCC(`Press Record, Plot the graph for V<sub>ac</sub>${vACS[Scenes.EE19AlreadySeleted - 1]}`);
        }
      };

      return true;
    }),


    //! conclusion 
    (step10 = function () {
      setIsProcessRunning(true);
        
      //to hide slider
      // sliders.hideAll()

      //to do slider hide from the 

      Scenes.items.btn_next.show();

      //! Required Items

      let items = Scenes.items
      

      items.part_4_1.set(41, -14, 440)
      items.part_4_2.set(475, -37, 288)
      items.part_4_3.set(475, 200, 288)

      items.helper_1.set(475, -15, 205).zIndex(1)
      items.helper_2.set(475 ,221, 219).zIndex(1)

        //! working
        function shiftRight(target){
          anime({
            targets: target.item,
            translateX: 440,
            easing: "linear",
            duration: 1800,
          })
        }

        anime.timeline({
          duration: 2000,
        })
        .add({
          begin(){
            shiftRight(items.helper_1)
          }
        })
        .add({
          begin(){
            shiftRight(items.helper_2)
          }
        })
        .add({
          begin(){
            setCC("Principle of operation of controlled rectifier was explained through waveforms.")
            setCC("The virtual experiments clearly demonstrated the load voltage and load power requirement met through firing angle control.")
            setCC("Simulation Done")
          }
        })
        
      

      
   
      return true
    }),



  ],
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      Scenes.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = () => {};
      this.currentStep -= 2;
      this.steps[this.currentStep]();
      this.currentStep++;
      backDrawerItem();
      backProgressBar();
    }
  },
  next() {
    //! animation isRunning
    // alert(Scenes.currentStep)
    if (isRunning) {
      return;
    }
    if (this.currentStep < this.steps.length) {
      if (this.steps[this.currentStep]()) {
        nextDrawerItem();
        nextProgressBar();
        this.currentStep++;
        // alert(`After Next: ${Scenes.currentStep}`)
      }
    } else {
    }
  },
};

//stepcalling
Scenes.currentStep = 1;
Scenes.next();
// Scenes.steps[3]()
// Scenes.next()
// Scenes.next()

const nextBtn = get(".btn-next");

const backBtn = get(".btn-back");
nextBtn.addEventListener("click", () => {
  Scenes.next();
});
backBtn.addEventListener("click", () => {
  Scenes.back();
});

// print certificate
get(".btn-save").addEventListener("click", () => {
  window.print();
});

let muteBtn = get(".btn-mute");
muteBtn.addEventListener("click", () => {
  if (isMute) {
    isMute = false;
    muteBtn.src = "./src/images/template_imgs/speech_off_btn.png";
    muteBtn.title = "Click to Mute";
  } else {
    isMute = true;
    muteBtn.src = "./src/images/template_imgs/speech_on_btn.png";
    muteBtn.title = "Click to Unmute";
    window.speechSynthesis.cancel();
  }
});

// ! Anime Header Hover Buttons
function btnPopupBox() {
  let popupBtns = document.querySelectorAll(".btn-popup");
  let popupWindow = document.querySelector(".btn-popup-window");

  popupBtns[0].onmouseover = () => {
    popupWindow.src = Scenes.items.formulas_procedure.item.src;
  };
  popupBtns[1].onmouseover = () => {
    popupWindow.src = Scenes.items.formulas_nomenclautre.item.src;
  };
  popupBtns[2].onmouseover = () => {
    switch (Scenes.forMathematicalExpressionBtn) {
      case 1:
        popupWindow.src = Scenes.items.formulas_ideal.item.src;
        break;

      case 2:
        popupWindow.src = Scenes.items.formulas_non_ideal.item.src;
        break;

      case 3:
        popupWindow.src = Scenes.items.formulas_efficiency.item.src;
        break;

      case 4:
        popupWindow.src = Scenes.items.formulas_component_stress.item.src;
        break;

      default:
        popupWindow.src = Scenes.items.formulas_universal.item.src;
        break;
    }
  };
}
btnPopupBox();

// Scenes.steps[2]()
// Scenes.steps[6]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[6]()

// i really enjoyed the voice of keybord
// its amazing

// mouse position
// function getCursor(event) {
//   let x = event.clientX;
//   let y = event.clientY;
//   let _position = `X: ${x - 419}<br>Y: ${y - 169}`;

//   const infoElement = document.getElementById("info");
//   infoElement.innerHTML = _position;
//   infoElement.style.top = y + "px";
//   infoElement.style.left = x + 20 + "px";
// }
