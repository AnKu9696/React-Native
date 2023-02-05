export const centerImg = (img, canvas) => {
    if (!img) {
        return
    }
    const wrh = img.assets[0].width / img.assets[0].height;
    let newWidth = canvas.current.width;
    let newHeight = newWidth / wrh;
    if (newHeight > canvas.current.height) {
        newHeight = canvas.current.height;
        newWidth = newHeight * wrh;
    }
    const xOffset = newWidth < canvas.current.width ? ((canvas.current.width - newWidth) / 2) : 0;
    const yOffset = newHeight < canvas.current.height ? ((canvas.current.height - newHeight) / 2) : 0;

    return {xOffset, yOffset, newWidth, newHeight}
}