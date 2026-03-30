

export function useDrag(onMove: (x: number, y: number) => void) {
  function onMouseDown(e: MouseEvent) {
    const startX = e.clientX;
    const startY = e.clientY;

    function onMoveHandler(eMove: MouseEvent) {
      const dx = eMove.clientX - startX;
      const dy = eMove.clientY - startY;
      onMove(dx, dy);
    }

    window.addEventListener("mousemove", onMoveHandler);

    window.addEventListener(
      "mouseup",
      () => {
        window.removeEventListener("mousemove", onMoveHandler);
      },
      { once: true }
    );
  }

  return { onMouseDown };
}