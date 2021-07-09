import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateName, getName } from "./api";
import FormElement from "./Form";
import Loading from "./Loading";

const Update = ({ history, match }) => {
    const [value, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadName();
    }, []);

    const loadName = () => {
        getName(match.params.id).then((d) => setName(d.data.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateName(match.params.id, { value })
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`${res.data.value} is updated`);
                history.push("/data");
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };
    return (
        <div>
            <div>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {loading ? <Loading /> : <h4>Update Name</h4>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FormElement
                            handleSubmit={handleSubmit}
                            value={value}
                            setName={setName}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;