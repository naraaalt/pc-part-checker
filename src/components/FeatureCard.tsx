type Props = {

    title: string;

    lines: string[];

};

export default function FeatureCard({

    title,

    lines,

}: Props) {

    return (

        <div className="feature-card">

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