const trailSegments = [
  ["D1", "beginner", "M160 628 C190 590 214 550 242 505 C270 460 292 412 315 350"],
  ["D2", "beginner", "M178 632 C226 590 252 548 282 505 C312 460 330 420 345 368"],
  ["C3", "beginner", "M198 610 C250 548 288 500 344 452 C394 410 433 370 470 316"],
  ["A9", "intermediate", "M455 646 C448 594 451 544 466 500 C480 458 498 416 518 374"],
  ["A10", "beginner", "M486 654 C485 604 494 558 508 516 C520 477 534 438 548 400"],
  ["A7", "intermediate", "M518 662 C530 612 541 567 554 520 C567 475 579 430 590 382"],
  ["A8", "intermediate", "M552 662 C564 615 576 568 590 525 C605 480 618 441 629 397"],
  ["A1", "beginner", "M642 675 C655 654 667 634 675 611 C682 590 687 568 690 544"],
  ["A2", "beginner", "M675 681 C690 657 701 634 708 610 C714 588 718 565 720 541"],
  ["B2", "intermediate", "M720 668 C690 620 674 573 676 525 C680 470 704 422 735 375 C766 327 793 275 800 213"],
  ["B1", "advanced selected", "M765 666 C742 618 735 570 747 521 C759 468 785 421 816 372 C848 320 875 260 874 182"],
  ["B3", "advanced", "M805 667 C795 619 796 569 811 520 C827 468 849 423 871 378 C895 330 912 282 912 227"],
  ["B9", "intermediate", "M842 671 C850 625 861 582 877 542 C895 497 910 456 920 415"],
  ["B10", "intermediate", "M880 672 C892 622 907 575 924 529 C943 478 960 430 973 376"],
  ["B13", "advanced", "M930 664 C958 613 976 561 986 507 C997 451 1005 397 1003 341 C1000 285 987 236 964 194"],
  ["B15", "advanced", "M985 516 C1030 501 1065 478 1089 446"],
  ["C1", "advanced", "M660 352 C680 304 708 260 744 220 C778 183 808 145 823 102"],
  ["C2", "advanced", "M711 374 C743 330 777 293 816 258 C853 224 880 187 892 142"],
  ["C5", "advanced", "M890 382 C915 339 937 300 953 259 C969 218 979 176 980 132"],
  ["C6", "advanced", "M938 400 C969 362 997 322 1017 280 C1038 236 1049 192 1046 150"]
];

const labels = [
  ["D1", 244, 498], ["C3", 365, 444], ["A7", 556, 515], ["A1", 678, 607],
  ["B2", 720, 460], ["B1", 817, 369], ["B9", 885, 535], ["B13", 995, 425],
  ["C1", 746, 217], ["C5", 951, 260]
];

const lifts = [
  ["L3", "M135 655 L360 345", 190, 555],
  ["L2", "M500 680 L575 392", 520, 595],
  ["L5", "M690 686 L816 190", 730, 548],
  ["L1", "M925 684 L1000 350", 947, 585]
];

export function renderMap(host, options = {}) {
  const showLabels = options.showLabels !== false;
  host.innerHTML = `
    <svg viewBox="0 0 1200 760" role="img" aria-label="Conceptual Fulong topology map for visual design comparison">
      <path class="ridge" d="M35 630 C150 540 195 430 280 338 C350 262 423 224 500 260 C570 294 615 240 664 172 C715 102 777 66 835 84 C905 104 921 165 975 190 C1030 216 1092 215 1175 165 L1175 760 L35 760 Z"/>
      <path class="contour" d="M44 590 C190 480 265 410 344 316 C410 238 486 220 548 254 C615 290 665 243 710 183 C766 109 820 93 875 111 C940 132 970 183 1160 132"/>
      <path class="contour" d="M66 625 C210 515 288 455 369 357 C438 274 505 259 570 292 C633 325 687 284 734 221 C786 151 844 127 901 147 C958 168 1014 203 1148 172"/>
      <path class="contour" d="M96 661 C240 558 318 500 402 405 C468 330 535 311 597 339 C660 367 716 327 765 272 C821 209 878 183 935 202 C997 223 1044 241 1133 226"/>
      <path class="contour" d="M142 697 C270 608 353 550 438 464 C508 393 574 374 635 398 C696 422 752 389 804 341 C862 286 922 262 979 279 C1034 295 1078 299 1120 291"/>
      <text class="peak-label" x="778" y="62">Upper ridge · concept topology</text>
      ${lifts.map(([name, path, x, y]) => `<g><path class="lift" d="${path}"/><circle class="station" cx="${path.match(/M(\d+)/)?.[1] ?? 0}" cy="655" r="7"/><text class="lift-label" x="${x}" y="${y}">${name}</text></g>`).join("")}
      ${trailSegments.map(([name, type, path]) => `<g data-trail="${name}"><path class="trail-hit" d="${path}"/><path class="trail ${type}" d="${path}"/></g>`).join("")}
      ${showLabels ? labels.map(([name, x, y]) => `<g class="trail-label" transform="translate(${x} ${y})"><rect x="-22" y="-15" width="44" height="30" rx="15"/><text text-anchor="middle" dominant-baseline="central">${name}</text></g>`).join("") : ""}
      <g opacity=".78"><rect class="station" x="622" y="675" width="118" height="32" rx="4"/><text class="peak-label" x="681" y="696" text-anchor="middle">BASE VILLAGE</text></g>
    </svg>`;
}
