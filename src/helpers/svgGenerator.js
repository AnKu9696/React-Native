export const svgGenerator = (image, allSegments, strokeWidth) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${image.width()}" height="${image.height()}" viewBox="0 0 ${image.width()} ${image.height()}">
<path d="${allSegments.join('')}" stroke="white"  stroke-width="${strokeWidth}" opacity="1" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>`
}