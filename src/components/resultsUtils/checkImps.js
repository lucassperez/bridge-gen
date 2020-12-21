function checkImps(diff) {
  diff = Math.abs(diff);

  if (diff < 20)
    return 0;
  else if (diff < 40)
    return 1;
  else if (diff < 80)
    return 2;
  else if (diff < 120)
    return 3;
  else if (diff < 160)
    return 4;
  else if (diff < 210)
    return 5;
  else if (diff < 260)
    return 6;
  else if (diff < 310)
    return 7;
  else if (diff < 360)
    return 8;
  else if (diff < 420)
    return 9;
  else if (diff < 490)
    return 10;
  else if (diff < 590)
    return 11;
  else if (diff < 740)
    return 12;
  else if (diff < 890)
    return 13;
  else if (diff < 1090)
    return 14;
  else if (diff < 1290)
    return 15;
  else if (diff < 1490)
    return 16;
  else if (diff < 1740)
    return 17;
  else if (diff < 1990)
    return 18;
  else if (diff < 2240)
    return 19;
  else if (diff < 2490)
    return 20;
  else if (diff < 2990)
    return 21;
  else if (diff < 3490)
    return 22;
  else if (diff < 3990)
    return 23;
  else
    return 24;
}

export default checkImps;
