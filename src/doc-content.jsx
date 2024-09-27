export default function DocContent({doccontent}) {
    const htmlContent = `
        ${doccontent}
    `;
    
    return (
        <div 
            className="doc-content-div"
            dangerouslySetInnerHTML={
            {__html: htmlContent}
        }></div>
    )
}
