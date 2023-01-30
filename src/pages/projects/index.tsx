import type { NextPage, GetServerSideProps } from "next";
import type { FormEvent } from "react";

import { useRef } from "react";

import { ProjectCard } from "../../components/ProjectCard/ProjectCard";
import { getServerAuthSession } from "../../server/auth";
import { api } from "../../utils/api";

const ProjectsPage: NextPage = () => {
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const utils = api.useContext();
  const projectsQuery = api.project.getAllProjects.useQuery();
  const addProject = api.project.addNewProject.useMutation({
    async onSuccess() {
      // Refetch projects after a new one is added.
      await utils.project.getAllProjects.invalidate();
    },
  });

  const handleSubmit = (event: FormEvent) => {
    (async () => {
      event.preventDefault();

      if (!nameInputRef.current) {
        console.error("nameInputRef is undefined");
        return;
      }

      try {
        await addProject.mutateAsync({ name: nameInputRef.current.value });
        event.target.reset();
      } catch (e) {
        console.error("Failed to add project.", e);
      }
    })().catch((e) => {
      console.error(e);
    });
  };

  return (
    <main className="flex min-h-screen justify-center bg-gray-900">
      <section className="w-full max-w-7xl pl-6 pr-6">
        {/* <h1 className="mt-8 mb-4 text-5xl font-bold text-white">Projects</h1>
        <hr className="mb-8 border-slate-600" /> */}

        <form onSubmit={handleSubmit} className="mb-8 mt-8 flex">
          <input
            ref={nameInputRef}
            className="mr-2 flex-1 rounded border border-gray-700 bg-gray-800 p-3 text-white"
            type="text"
            placeholder="Project name"
          />
          <input
            className="cursor-pointer rounded border border-blue-500 bg-blue-800 p-3 px-6 text-blue-200"
            type="submit"
            value="+ Create Project"
          />
        </form>

        <ul className="grid grid-cols-4 gap-4">
          {!projectsQuery.data ? (
            <p className="text-white">Loading...</p>
          ) : (
            projectsQuery.data.map(({ id, name }) => (
              <ProjectCard
                href={`/projects/${name}?id=${id}`}
                key={id}
                name={name}
              />
            ))
          )}
        </ul>
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default ProjectsPage;
