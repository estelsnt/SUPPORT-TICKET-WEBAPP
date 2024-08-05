export function redBorderMarker(elem){
    const original = elem.style.border;
    elem.style.transition = "border 0.5s";
    elem.style.border = "1px solid var(--danger)";
    setTimeout(()=>elem.style.border = original, 2000);
}