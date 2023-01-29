import type { NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

const ProjectDetailsPage: NextPage = () => {
  const router = useRouter();
  const { projectId, name } = router.query;

  const utils = api.useContext();
  const deleteProject = api.project.deleteById.useMutation({
    async onSuccess() {
      await utils.project.getAllProjects.invalidate();
      router.back();
    },
  });

  const handleDeleteClick = async () => {
    if (typeof projectId === "string") {
      await deleteProject.mutateAsync({ projectId });
    }
  };

  return (
    <main className="flex min-h-screen justify-center bg-gray-900">
      <section className="w-full max-w-7xl pl-6 pr-6">
        <div className="flex">
          <h1 className="mt-8 mb-4 flex-1 text-5xl font-bold text-white">
            {name}
          </h1>
          <button
            onClick={handleDeleteClick}
            className="flex-shrink place-self-end rounded bg-red-500 p-2 px-4 font-semibold text-red-300"
          >
            Delete
          </button>
        </div>
        <h2 className="text-lg text-gray-400">{projectId}</h2>
      </section>
    </main>
  );
};

export default ProjectDetailsPage;
