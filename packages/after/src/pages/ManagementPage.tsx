import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  EntityDialog,
  EntityForm,
  EntityStats,
  EntityTable,
  EntityToggle,
  InlineAlert,
  buildPostStats,
  buildStats,
  entityCopy,
  postDefaultValues,
  type DialogMode,
  type Entity,
  type EntityType,
  type PostFormValues,
  type StatusAction,
  type UserFormValues,
  userDefaultValues,
} from "@/features/management";
import { postService } from "@/services/postService";
import type { Post } from "@/services/postService";
import { userService } from "@/services/userService";
import type { User } from "@/services/userService";
import type { AlertVariant } from "@/features/management/types";

export const ManagementPage = () => {
  const [entityType, setEntityType] = useState<EntityType>("post");
  const [entities, setEntities] = useState<Entity[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>("create");
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [alert, setAlert] = useState<{ variant: AlertVariant; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEntities = async () => {
    setLoading(true);
    try {
      const result =
        entityType === "user"
          ? await userService.getAll()
          : await postService.getAll();
      setEntities(result);
    } catch (error) {
      console.error(error);
      setAlert({ variant: "error", message: "데이터를 불러오는데 실패했습니다." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAlert(null);
    setDialogOpen(false);
    setSelectedEntity(null);
    void fetchEntities();
  }, [entityType]);

  const stats = useMemo(() => {
    if (entityType === "user") {
      return buildStats("user", entities as User[]);
    }
    return buildPostStats(entities as Post[]);
  }, [entityType, entities]);

  const openCreateDialog = () => {
    setDialogMode("create");
    setSelectedEntity(null);
    setDialogOpen(true);
  };

  const openEditDialog = (entity: Entity) => {
    setDialogMode("edit");
    setSelectedEntity(entity);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedEntity(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      if (entityType === "user") {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }
      await fetchEntities();
      setAlert({ variant: "success", message: "삭제되었습니다." });
    } catch (error: any) {
      setAlert({ variant: "error", message: error.message ?? "삭제에 실패했습니다." });
    }
  };

  const handleStatusAction = async (id: number, action: StatusAction) => {
    if (entityType !== "post") return;
    try {
      if (action === "publish") {
        await postService.publish(id);
      } else if (action === "archive") {
        await postService.archive(id);
      } else {
        await postService.restore(id);
      }
      await fetchEntities();
      const actionLabel =
        action === "publish" ? "게시" : action === "archive" ? "보관" : "복원";
      setAlert({ variant: "success", message: `${actionLabel}되었습니다.` });
    } catch (error: any) {
      setAlert({ variant: "error", message: error.message ?? "작업에 실패했습니다." });
    }
  };

  const handleUserSubmit = async (values: UserFormValues) => {
    try {
      if (dialogMode === "create") {
        await userService.create(values);
        setAlert({ variant: "success", message: "사용자가 생성되었습니다." });
      } else if (selectedEntity) {
        await userService.update(selectedEntity.id, values);
        setAlert({ variant: "success", message: "사용자가 수정되었습니다." });
      }
      await fetchEntities();
      closeDialog();
    } catch (error: any) {
      setAlert({ variant: "error", message: error.message ?? "저장에 실패했습니다." });
    }
  };

  const handlePostSubmit = async (values: PostFormValues) => {
    try {
      if (dialogMode === "create") {
        await postService.create(values);
        setAlert({ variant: "success", message: "게시글이 생성되었습니다." });
      } else if (selectedEntity) {
        await postService.update(selectedEntity.id, values);
        setAlert({ variant: "success", message: "게시글이 수정되었습니다." });
      }
      await fetchEntities();
      closeDialog();
    } catch (error: any) {
      setAlert({ variant: "error", message: error.message ?? "저장에 실패했습니다." });
    }
  };

  const formDefaults = useMemo<UserFormValues | PostFormValues>(() => {
    if (entityType === "user") {
      if (selectedEntity && "username" in selectedEntity) {
        return {
          username: selectedEntity.username,
          email: selectedEntity.email,
          role: selectedEntity.role,
          status: selectedEntity.status,
        };
      }
      return { ...userDefaultValues } as UserFormValues;
    }

    if (selectedEntity && "title" in selectedEntity) {
      return {
        title: selectedEntity.title,
        author: selectedEntity.author,
        category: selectedEntity.category as PostFormValues["category"],
        status: selectedEntity.status as PostFormValues["status"],
        content: selectedEntity.content,
      };
    }
    return { ...postDefaultValues } as PostFormValues;
  }, [entityType, selectedEntity]);

  const entityLabel = entityCopy[entityType].label;

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header className="space-y-4 rounded-2xl border bg-background px-6 py-5 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Admin Studio
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">엔티티 관리</h1>
            <p className="text-muted-foreground text-sm">
              Atomic 카테고리 대신 실제 업무 단위로 구성했습니다.
            </p>
          </div>
          <EntityToggle value={entityType} onChange={setEntityType} />
        </div>
      </header>

      {alert && (
        <InlineAlert variant={alert.variant} onClose={() => setAlert(null)}>
          {alert.message}
        </InlineAlert>
      )}

      <EntityStats
        title={`${entityLabel} 현황`}
        description={entityCopy[entityType].description}
        metrics={stats}
      />

      <div className="rounded-2xl border bg-background px-6 py-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{entityLabel} 목록</h2>
            <p className="text-muted-foreground text-sm">
              상태 변경, 정렬, 액션을 한 곳에서 처리합니다.
            </p>
          </div>
          <Button onClick={openCreateDialog}>새로 만들기</Button>
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="grid place-items-center rounded-xl border border-dashed py-16 text-sm text-muted-foreground">
              데이터를 불러오는 중입니다...
            </div>
          ) : (
            <EntityTable
              entityType={entityType}
              data={entities}
              onEdit={openEditDialog}
              onDelete={handleDelete}
              onStatusAction={handleStatusAction}
            />
          )}
        </div>
      </div>

      <EntityDialog
        open={dialogOpen}
        onClose={closeDialog}
        entityType={entityType}
        mode={dialogMode}
      >
        {entityType === "user" ? (
          <EntityForm
            entityType="user"
            mode={dialogMode}
            defaultValues={formDefaults as UserFormValues}
            onSubmit={handleUserSubmit}
            onCancel={closeDialog}
          />
        ) : (
          <EntityForm
            entityType="post"
            mode={dialogMode}
            defaultValues={formDefaults as PostFormValues}
            onSubmit={handlePostSubmit}
            onCancel={closeDialog}
          />
        )}
      </EntityDialog>
    </section>
  );
};
