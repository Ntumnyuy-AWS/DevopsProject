"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../../services/api";
import { AuthContext } from "../../context/authContext.js"
import { FormContainer,
         Input,
         Button,
         Title
 } from "../../component/Layout/forms/FormStyle";

 export default function Login() {
    const Router = useRouter();
    const { login } = useContext(AuthContext);

    const [ form, setForm ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDefaultResultOrder("");

        try {
            const data = await apiRequest("auth/login", "POST", form);
            login(data);
            Router.push("/dashboard");
        }catch (err) {
            setError(err.message)
        }
    }


    return (
        <FormContainer>
            <Title>Register</Title>

            {error && <p style={{color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <Input placeholder="Name" onChange={(e) => setForm({ ...form, email: e.target.value})}/>
                <Input placeholder="Name" onChange={(e) => setForm({ ...form, password: e.target.value})}/>
                <Button type="submit">Register</Button>
            </form>
        </FormContainer>
    )
 };

