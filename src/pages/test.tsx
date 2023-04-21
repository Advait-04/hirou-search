import axios from "axios";

const Test = () => {
    async function clickHandler() {
        axios
            .get("/api/instaFetch")
            .then((res) => JSON.stringify(res.data))
            .then((data) => {
                console.log(data);
            });
    }

    return (
        <div className="flex justify-center">
            <button
                onClick={clickHandler}
                className="m-10 bg-blue-600 py-3 px-5 rounded-md text-white
            "
            >
                Hello
            </button>
        </div>
    );
};

export default Test;
