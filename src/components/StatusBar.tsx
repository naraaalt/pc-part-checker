export default function StatusBar() {

    const today = new Date();

    return (

        <header className="status-bar">

            <div>

                PC PART COMPATIBILITY CHECKER

            </div>

            <div>

                {today.toLocaleDateString()}

            </div>

        </header>

    );

}