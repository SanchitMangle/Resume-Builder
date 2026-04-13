import React from 'react'
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'

const ResumePreview = ({ data, template, accenetColor, Classes = "" }) => {

    const renderTemplate = () => {
        switch (template) {
            case "modern":
                return <ModernTemplate data={data} accentColor={accenetColor} />;
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accenetColor} />;
            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={accenetColor} />;
            default:
                return <ClassicTemplate data={data} accentColor={accenetColor} />;
        }
    }

    return (
        <div className='w-full bg-gray-100'>
            <div id='resume-preview' className={"border border-gray-200 print:shadow-none print:border-none " + Classes}>
                {renderTemplate()}
            </div>

            <style jsx>
                {
                    `
                    @page{
                    size:latter;
                    margin:0
                    }

                    @media print {
                       html,body {
                       width:8.5in;
                       height:11in;
                       overflow:hidden;
                       }

                       body * {
                       visiblity:idden;
                       }

                       #resume-preview, #resume-preview {
                       visiblity:visible;
                       }

                       #resume-preview {
                       position:absolute;
                       top:0;
                       left:0;
                       width:100%;
                       height:auto;
                       margin:0;
                       padding:0;
                       border:none !important;
                       box-shadow:none !important;
                       }
                    }
                    `
                }
            </style>
        </div>
    )
}

export default ResumePreview
