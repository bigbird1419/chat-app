export default function NotLayout({ children }) {
    return (
        <div className="wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}