
const url:string = 'http://localhost:8010'

interface Student {
    id: number;
    name: string;
    age: number;
    locked: boolean;
    create_at: string;
}

const getStudents: () => Promise<Student[]> = async () =>
{
    const response = await fetch(`${url}/api/v1/students`)
    console.log(response.status);
    return !response.ok ? []: response.json();
}

const getStudentById: (id: number) => Promise<Student> = async (id: number) =>
{
    const response = await fetch(`${url}/api/v1/student/${id}`);
    const data:Student = await response.json();
    return data
}

export { getStudents, getStudentById };
export type { Student };
