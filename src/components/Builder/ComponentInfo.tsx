type Props = {

    title: string;

    data?: Record<string, string | number | boolean>;

};

export default function ComponentInfo({

    title,

    data,

}: Props) {

    if (!data) {

        return (

            <div className="component-info empty">

                <h3>{title}</h3>

                <p>No component selected.</p>

            </div>

        );

    }

    return (

        <div className="component-info">

            <h3>{title}</h3>

            <hr />

            {Object.entries(data).map(([key, value]) => (

                <div
                    key={key}
                    className="info-row"
                >

                    <span>{key}</span>

                    <span>{String(value)}</span>

                </div>

            ))}

        </div>

    );

}