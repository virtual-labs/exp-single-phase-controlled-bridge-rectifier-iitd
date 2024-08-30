### Theory


<center>
  <img src="images/th1.png" height="220px">
  
Fig. 1. Silicon controlled rectifier/ Thyristor.

</center>
<br>
A thyristor [1]-[2] is a semiconductor device comprising four layers that form a P-N-P-N structure. It has three terminals: anode (A), cathode (K), and gate (G). The gate terminal is responsible for triggering the thyristor. Applying a small current to the gate can turn-ON the device, and once it is ON-state, the gate loses control, causing the thyristor to remain conducting until the current falls below the holding current level. The thyristor operation is classified into four modes: Forward Blocking, Forward Conduction, Reverse Blocking, and Reverse Breakdown.<br><br>
Thyristor-based rectifiers, which convert AC –to- DC, are extensively used in various industrial applications due to their efficiency, controllability, and reliability. These rectifiers offer controlled rectification, allowing to realize different output voltage and current levels. By adjusting the firing angle, the average load voltage of the rectifier can be varied, enabling smooth control of the power delivered to the load.<br>

<br>

<center>
  <img src="images/th2.png" height="700px">
  
<br>Fig. 2. Circuit diagram of controlled rectifier.

</center>
<br>

<table border="0" align="center" style="width:100%; border:none;">
  <tr>
<td style="width:50%">
<center>

<img src="images/th3.png">
<br><br>
Fig. 3(a). Positive-half cycle.
<br><br>
</center>
</td>
<td style="width:50%">
  
<center>

<img src="images/th4.png">
<br><br>
Fig. 3(b). Negative-half cycle.
<br><br>
</center> 
    </td>
  </tr>
</table>
<br>

<div style="float: left; width:100%;"><br>
Fig. 2 shows a fully controlled bridge rectifier, which uses four thyristors to control the load voltage. Thyristors T<sub>1</sub> and T<sub>2</sub> must be fired simultaneously during the positive half cycle while Thyristors T<sub>3</sub> and T<sub>4</sub> must be fired during the negative half cycle of the source voltage. All the thyristors must be given firing pulses of suitable pulse sequence. The steady-state waveforms for two different loads (R and R-L) are shown in Fig. 4. Based on these waveforms various equations (for RL-load) are formulated [3]-[5] as given below:
<br><br>
The average output voltage and currents are defined by:
<br>
</div>

<br>
<div style="float: left; width:50%;">
  <img src="images/th5.png" height="60px">
</div>
<div style="float: right; width:50%; text-align:center;">
    ..(1)
</div>
<br>

<div style="float: left; width:100%;">
&nbsp;
</div>

<div style="float: left; width:50%;">
  <img src="images/th6.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(2)

</div>
<br>
