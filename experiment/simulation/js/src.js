const src = {
  // pick imgs from the dom

  allImgs: [],
  allImgsDom: document.querySelectorAll(".main-window-imgs"),
  allVideosDom: document.querySelectorAll(".main-window-videos"),

  // ! new added
  allQsDom: document.querySelectorAll(".qs"),


  set() {
    let index = 0;
    this.allItems = {

      // !Template images
      arrowRound: this.allImgsDom[index++],
      blinkArrow: this.allImgsDom[index++],
      laerrow: this.allImgsDom[index++],
      laerrow2: this.allImgsDom[index++],
      logo: this.allImgsDom[index++],
      man: this.allImgsDom[index++],
      measurearrow: this.allImgsDom[index++],
      measurearrow2: this.allImgsDom[index++],
      redsize: this.allImgsDom[index++],                                         
      speech_off_btn: this.allImgsDom[index++],
      speech_on_btn: this.allImgsDom[index++],
      talk_cloud: this.allImgsDom[index++],
      iit_delhi_logo: this.allImgsDom[index++],
      // !Template images end

      // ! Procedure formula Nomenclature images 
      formulas_component_stress:this.allImgsDom[index++],
      formulas_efficiency:this.allImgsDom[index++],
      formulas_ideal:this.allImgsDom[index++],
      formulas_nomenclautre:this.allImgsDom[index++],
      formulas_non_ideal:this.allImgsDom[index++],
      formulas_procedure:this.allImgsDom[index++],
      formulas_universal:this.allImgsDom[index++],
      // ! Procedure formula Nomenclature images end

      //! EE19 images added here

    alpha_value:this.allImgsDom[index++],
    box_img:this.allImgsDom[index++],
    btn_delete:this.allImgsDom[index++],
    btn_record:this.allImgsDom[index++],
    btn_reset:this.allImgsDom[index++],
    circuit_rl_load:this.allImgsDom[index++],
    circuit_r_load:this.allImgsDom[index++],
    component_d1:this.allImgsDom[index++],
    component_transformer:this.allImgsDom[index++],
    component_voltage:this.allImgsDom[index++],
    graph_bcg:this.allImgsDom[index++],
    grpah_bcg:this.allImgsDom[index++],
    option_1:this.allImgsDom[index++],
    option_2:this.allImgsDom[index++],
    option_3:this.allImgsDom[index++],
    part_1_circuit:this.allImgsDom[index++],
    part_1_correct_text:this.allImgsDom[index++],
    part_1_text_pink:this.allImgsDom[index++],
    part_1_text_red:this.allImgsDom[index++],
    part_2_select_option:this.allImgsDom[index++],
    part_3_circuit:this.allImgsDom[index++],
    part_4_1:this.allImgsDom[index++],
    part_4_2:this.allImgsDom[index++],
    part_4_3:this.allImgsDom[index++],
    rl_load_a_green:this.allImgsDom[index++],
    rl_load_text:this.allImgsDom[index++],
    rl_load_v_blue:this.allImgsDom[index++],
    rl_load_v_brown:this.allImgsDom[index++],
    rl_load_v_red:this.allImgsDom[index++],
    rl_value:this.allImgsDom[index++],
    r_load_a_blur:this.allImgsDom[index++],
    r_load_a_green_graph:this.allImgsDom[index++],
    r_load_text:this.allImgsDom[index++],
    r_load_v_blue:this.allImgsDom[index++],
    r_load_v_blue_graph:this.allImgsDom[index++],
    r_load_v_brown:this.allImgsDom[index++],
    r_load_v_brown_graph:this.allImgsDom[index++],
    r_load_v_red:this.allImgsDom[index++],
    r_load_v_red_graph:this.allImgsDom[index++],
    tab_1:this.allImgsDom[index++],
    tab_1f:this.allImgsDom[index++],
    tab_2:this.allImgsDom[index++],
    tab_2f:this.allImgsDom[index++],
    tab_3:this.allImgsDom[index++],
    tab_3f:this.allImgsDom[index++],
    tab_4:this.allImgsDom[index++],
    tab_4f:this.allImgsDom[index++],
    tab_5:this.allImgsDom[index++],
    tab_5f:this.allImgsDom[index++],
    tab_6:this.allImgsDom[index++],
    tab_6f:this.allImgsDom[index++],
    tab_7:this.allImgsDom[index++],
    tab_7f:this.allImgsDom[index++],
    tab_8:this.allImgsDom[index++],
    tab_8f:this.allImgsDom[index++],
    tab_alpha:this.allImgsDom[index++],
    tab_alpha_vs:this.allImgsDom[index++],
    vac_value:this.allImgsDom[index++],
    
    
    // copied components
    component_d2:this.allImgsDom[index++],
    component_d3:this.allImgsDom[index++],
    component_d4:this.allImgsDom[index++],
    btn_check:this.allImgsDom[index++],
    graph_bcg_2:this.allImgsDom[index++],
    graph_bcg_3:this.allImgsDom[index++],
    graph_bcg_4:this.allImgsDom[index++],
    arrow_red:this.allImgsDom[index++],
    arrow_green:this.allImgsDom[index++],
    arrow_brown:this.allImgsDom[index++],
    arrow_blue:this.allImgsDom[index++],
    
    //for multiple graph helpers
    graph_helper_1:this.allImgsDom[index++],
    graph_helper_2:this.allImgsDom[index++],
    graph_helper_3:this.allImgsDom[index++],
    graph_helper_4:this.allImgsDom[index++],
    
    helper_1:this.allImgsDom[index++],
    helper_2:this.allImgsDom[index++],
    btn_hint:this.allImgsDom[index++],
    hint_box:this.allImgsDom[index++],




     
      //! EE19 images end here



      // * Question Mark
      domQs1: this.allQsDom[0],
      domQs2: this.allQsDom[1],
      domQs3: this.allQsDom[2],
      domQs4: this.allQsDom[3],
      domQs5: this.allQsDom[4],
      domQs6: this.allQsDom[5],
      
      
      // * Videos
      // yoke_front_to_back: this.allVideosDom[0],
      // yoke_front_to_side: this.allVideosDom[1],
      // panel1: this.allVideosDom[2],
      // panel2: this.allVideosDom[3],

      bfs_video: this.allVideosDom[0],
    };
  },
  allImgsInitialAxis: [],
  get(itemName) {
    return this.allItems[itemName];
  },
};
// setting src
src.set();
