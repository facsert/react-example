"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, FormEvent } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
} from "@/components/ui/dialog";

import { PenLine, Trash2, Plus } from "lucide-react";

interface Rule {
  id: number;
  name: string;
  keyword: string;
}

interface Link {
  isLoading: boolean;
  url: string;
  filename: string;
}


// TODO: 修改布局和内容
export default function UploadPage() {
  const [file, setFile] = useState<File>();
  const [link, setLink] = useState<Link>({
    isLoading: false,
    url: "",
    filename: "",
  });
  const [rules, setRules] = useState<Rule[]>([
    { id: 0, name: "blacklist", keyword: "error" },
    { id: 1, name: "timeout", keyword: "timeout" },
  ]);

  const formData = new FormData();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      toast.error("please add file", {
        action: { label: "ok", onClick: () => {} },
      });
      return;
    }

    setLink({ ...link, isLoading: true });
    formData.append("file", file);
    // formData.append("rules", `${blacklist? "blacklist": ""},${timeout? "timeout": ""},${panic? "panic": ""}`)

    try {
      const response = await fetch("http://localhost:8050/api/v1/scan/file", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const blob = await response.blob();
        setLink({
          isLoading: false,
          url: window.URL.createObjectURL(blob),
          filename:
            response.headers.get("Content-Disposition") ??
            "filename=example.zip",
        });
        console.log("upload success");
      } else {
        console.log("upload failed");
      }
    } catch (error) {
      console.log("upload error", error);
    }
  }

  function Download() {
    if (!link.url) {
      toast.error("no response", {
        action: { label: "ok", onClick: () => {} },
      });
      return;
    }
    const element = document.createElement("a");
    element.href = link.url;
    element.download = link.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    window.URL.revokeObjectURL(link.url);

    setLink({ ...link, url: "" });
    console.log("upload success");
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-full h-[300px] z-0 border rounded-md hover:bg-accent ">
          <Label
            htmlFor="uploadFile"
            className="flex flex-col justify-end items-center w-full h-[300px] z-10 cursor-pointer"
          >
            <p>{file?.name ?? "upload File"}</p>
          </Label>
          <Input
            className="w-full h-[300px] z-30 opacity-0 cursor-pointer"
            id="uploadFile"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
        </div>
        <div className="w-full flex flex-row flex-wrap content-start gap-4 h-[20vh] border mt-4 p-4 rounded-md bg-card">
          {rules.map((r) => (
            <Item key={r.id} id={r.id} rules={rules} setRules={setRules} />
          ))}
          <AddItem rules={rules} setRules={setRules} />
        </div>
        <div className="flex flex-col gap-4 my-4">
          <Button type="submit">Submit</Button>
          <Button className="w-full" type="button" onClick={Download}>
            Download
          </Button>
        </div>
      </form>
    </div>
  );
}

function Item({
  id,
  rules,
  setRules,
}: {
  id: number;
  rules: Rule[];
  setRules: React.Dispatch<React.SetStateAction<Rule[]>>;
}) {
  const rule = rules[id] ?? { id: 0, name: "", keyword: "" };
  const [name, setName] = useState<string>(rule.name);
  const [keyword, setKeyword] = useState<string>(rule.keyword);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleEdit = () => {
    setRules(
      rules.map((r) =>
        r.id === id ? { ...r, name: name, keyword: keyword } : r
      )
    );
    console.log(`${rules[0].name} ${rules[0].keyword}`);
  };

  const handleDelete = () => {
    setRules(rules.filter((r) => r.id !== id));
  };
  return (
    <div className="flex flex-row items-center justify-between w-[12vw] h-[6vh] border hover:bg-accent rounded-md p-2">
      <p className="truncate">{name}</p>
      <div className="flex flex-row gap-2">
        <Dialog>
          <DialogTrigger>
            <PenLine />
          </DialogTrigger>
          <DialogContent>
            <div className="flex flex-col gap-4">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={handleName}></Input>

              <Label className="mt-4" htmlFor="keyword">
                Keyword
              </Label>
              <Input
                id="keyword"
                value={keyword}
                onChange={handleKeyword}
              ></Input>
            </div>
            <DialogClose
              onClick={handleEdit}
              className="h-[6vh] bg-primary rounded-md text-black"
            >
              FINISH
            </DialogClose>
          </DialogContent>
        </Dialog>
        <Trash2 onClick={handleDelete} className="cursor-pointer" />
      </div>
    </div>
  );
}

function AddItem({
  rules,
  setRules,
}: {
  rules: Rule[];
  setRules: React.Dispatch<React.SetStateAction<Rule[]>>;
}) {
  const [name, setName] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleAdd = () => {
    const sortRule = rules.map((r, i) => {
      return { ...r, id: i };
    });
    setRules([
      ...sortRule,
      { id: sortRule.length, name: name, keyword: keyword },
    ]);
    setName("");
    setKeyword("");
  };

  return (
    <div className="w-[12vw] h-[6vh] border hover:bg-accent rounded-md p-2">
      <Dialog>
        <DialogTrigger className="w-full h-full flex flex-row justify-center items-center gap-2">
          <Plus />
          <p>Add Item</p>
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={handleName}></Input>

            <Label className="mt-4" htmlFor="keyword">
              Keyword
            </Label>
            <Input
              id="keyword"
              value={keyword}
              onChange={handleKeyword}
            ></Input>
          </div>
          <DialogClose
            onClick={handleAdd}
            className="h-[6vh] bg-primary rounded-md text-black"
          >
            ADD
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
