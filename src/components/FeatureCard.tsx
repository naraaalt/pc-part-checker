type Props = {

    title: string;

    lines: string[];

    onClick?: () => void;

};

export default function FeatureCard({

    title,

    lines,

    onClick,

}: Props) {

    return (

        <div className="feature-card" onClick={onClick}>

            <div className="card-header">

                {title.toUpperCase()}

            </div>

            <div className="separator"/>

            <div className="content">

                {lines.map((line,index)=>

                    <p key={index}>{line}</p>

                )}

            </div>

        </div>

    );

}