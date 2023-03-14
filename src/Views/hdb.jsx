import { Outlet, Link, useLoaderData } from "react-router-dom";

const hdb = () => {


    return (
        <div className="container">
            <div class="text-center">This is HDB page</div>
            <div class="list-group">
                <button type="button" class="list-group-item list-group-item-action active" aria-current="true">
                    The current button
                </button>
                <Link to={`hdb/1`}><button type="button" class="list-group-item list-group-item-action">A second button item</button></Link>
                <button type="button" class="list-group-item list-group-item-action">A third button item</button>
                <button type="button" class="list-group-item list-group-item-action">A fourth button item</button>
                <button type="button" class="list-group-item list-group-item-action" disabled>A disabled button item</button>
            </div>

        </div>
    )
}

export default hdb