import {
    useState
} from "react";

export function useDrag(onMove) {
    const [dragging, setDragging] = useState(false);

    function onMouseDown(e) {
        setDragging(true);

        const startX = e.clientX;
        const startY = e.clientY;

        function onMoveHandler(eMove) {
            const dx = eMove.clientX - startX;
            const dy = eMove.clientY - startY;
            onMove(dx, dy);
        }

        function onUp() {
            setDragging(false);
            window.removeEventListener("mousemove", onMoveHandler);
            window.removeEventListener("mouseup", onUp);
        }

        window.addEventListener("mousemove", onMoveHandler);
        window.addEventListener("mouseup", onUp);
    }

    return {
        onMouseDown,
        dragging
    };
}