
import { create } from 'zustand'
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
        // return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

const getStudentById: (id: number) => Promise<Student> = async (id: number) => {   
    try {
        const response = await fetch(`${url}/api/v1/student/${id}`);
        return response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

// interface StudentStore {
//     student: Student;
//     students: Student[];
//     get: () => Promise<Student[]>;
//     getById: (id: string) => Promise<Student | null>;
// }

// const useStudentStore = create<StudentStore>((set) => ({
//     student: {id: 0, name: '', age: 18, locked: false, create_at: ""},
//     students: [],
//     get: async () => set((state) => ({ students: getStudents() })),
//     getById: async (id) => set((state) => ({ student: getStudentById(id) }))
// }));

export { getStudents, getStudentById };
export type { Student };

