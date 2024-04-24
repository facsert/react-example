
const url:string = 'http://localhost:8010'

interface Student {
    id: number;
    name: string;
    age: number;
    locked: boolean;
    create_at: string;
}

const getStudents: () => Promise<Student[]> = async () => {   
    try {
        const response = await fetch(`${url}/api/v1/students`)
        console.log(response.status);
        return !response.ok ? []: response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

const getStudentById: (id: number) => Promise<Student> = async (id: number) => {   
    try {
        const response = await fetch(`${url}/api/v1/student/${id}`);
        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export { getStudents, getStudentById };
export type { Student };
