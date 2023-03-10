import { Popover, Transition } from "@headlessui/react";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { getServerAuthSession } from "../../server/auth";
import { api } from "../../utils/api";
import { PlusIcon } from "@heroicons/react/20/solid";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type TableEntry } from "@prisma/client";

type FormData = Omit<TableEntry, "id" | "projectId">;

const ProjectDetailsPage: NextPage = () => {
  const router = useRouter();
  const { projectName, id } = router.query;

  const utils = api.useContext();

  const tableEntries = api.projectEntries.findByProjectId.useQuery({
    id: id as string,
  });

  const deleteProject = api.project.deleteById.useMutation({
    async onSuccess() {
      await utils.project.getAllProjects.invalidate();
      router.back();
    },
  });

  const createTableEntry = api.projectEntries.addEntry.useMutation({
    onError(error) {
      console.error("Failed to create table entry. ", error);
    },

    async onSuccess() {
      console.info("Successfully added table entry! 🎉");
      await utils.projectEntries.findByProjectId.invalidate();
    },
  });

  const { register, handleSubmit, formState } = useForm<FormData>();
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log({ data });

    await createTableEntry.mutateAsync({
      ...data,
      projectId: id as string,
    });
  };

  const handleDeleteClick = async () => {
    if (typeof projectName === "string") {
      await deleteProject.mutateAsync({ projectId: id as string });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-900">
      <section className="w-full max-w-7xl pl-6 pr-6">
        <div className="flex">
          <h1 className="mt-8 mb-4 flex-1 text-5xl font-bold text-white">
            {projectName}
          </h1>
          <button
            onClick={handleDeleteClick}
            className="flex-shrink place-self-end rounded bg-red-500 p-2 px-4 font-semibold text-red-200"
          >
            Delete
          </button>
        </div>
        <p className="text-lg text-gray-400">{id}</p>
        <section className="mb-8 mt-8">
          <Popover>
            <Popover.Button className="flex items-center rounded border border-gray-600 py-2 pl-3 pr-5 text-white">
              <PlusIcon className="w-4" />
              <span className="ml-2">Add entry</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 -translate-y-2"
              enterTo="transform opacity-100 translate-y-0"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 translate-y-0"
              leaveTo="transform opacity-0 -translate-y-2"
            >
              <Popover.Panel className="absolute mt-2 w-fit">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex w-96 flex-col items-stretch  rounded bg-gray-800 p-4"
                >
                  <div className="mb-6 flex flex-col">
                    <label
                      htmlFor="name"
                      className="mb-1 text-xs font-semibold uppercase text-white"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      className="rounded bg-gray-700 p-3 text-white"
                      placeholder="John Doe"
                      type="text"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="mt-2 block text-sm text-red-400">
                        This field is required.
                      </span>
                    )}
                  </div>

                  <div className="mb-6 flex flex-col">
                    <label
                      htmlFor="email"
                      className="mb-1 text-xs font-semibold uppercase text-white"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      className="rounded bg-gray-700 p-3 text-white"
                      placeholder="john.doe@email.com"
                      type="text"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="mt-2 block text-sm text-red-400">
                        This field is required.
                      </span>
                    )}
                  </div>

                  <div className="mb-6 flex flex-col">
                    <label
                      htmlFor="role"
                      className="mb-1 text-xs font-semibold uppercase text-white"
                    >
                      Role
                    </label>
                    <input
                      id="role"
                      className="rounded bg-gray-700 p-3 text-white"
                      placeholder="developer"
                      type="text"
                      {...register("role")}
                    />
                  </div>

                  <div className="mb-6 flex flex-col">
                    <label
                      htmlFor="group"
                      className="mb-1 text-xs font-semibold uppercase text-white"
                    >
                      Group
                    </label>
                    <input
                      id="group"
                      className="rounded bg-gray-700 p-3 text-white"
                      placeholder="Application team"
                      type="text"
                      {...register("group")}
                    />
                  </div>

                  <div className="mb-6 flex flex-col">
                    <label
                      htmlFor="notificationChannel"
                      className="mb-1 text-xs font-semibold uppercase text-white"
                    >
                      Notification channel
                    </label>
                    <input
                      id="notificationChannel"
                      className="rounded bg-gray-700 p-3 text-white"
                      placeholder="news"
                      type="text"
                      {...register("notificationChannel")}
                    />
                  </div>

                  <Popover.Button
                    className="rounded bg-green-600 py-2 text-white"
                    type="submit"
                  >
                    Add
                  </Popover.Button>
                </form>
              </Popover.Panel>
            </Transition>
          </Popover>
        </section>
        <section>
          {tableEntries.data?.length > 0 && (
            <table className="table-fixed border-collapse bg-gray-800 text-white">
              <thead>
                <tr>
                  {Object.keys(tableEntries.data[0]).map(
                    (columnHead, index) => (
                      <th className="p-2 text-left" key={`${id}-col-${index}`}>
                        {columnHead}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="border-t border-t-gray-700">
                {tableEntries.data.map((entry, rowIndex) => {
                  const values = Object.values(entry);
                  return (
                    <tr
                      className="even:bg-gray-700 hover:bg-gray-600"
                      key={`${id}-row-${rowIndex}`}
                    >
                      {values.map((value, rowDataIndex) => (
                        <td
                          className="p-2"
                          key={`${id}-row-${rowIndex}-${rowDataIndex}`}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
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

export default ProjectDetailsPage;
