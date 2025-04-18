import React from "react";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import { MappingAcCatalogController } from "./mapping-ac-catalog-controller";
import { MappingAcCatalogMenuList } from "./mapping-ac-catalog-menu-list";
import MappingAcCatalogTab from "./mapping-ac-catalog-menu-tab";

const toEmptyList = () => {
  return (
    <List dense>
      <ListItem>
        <ListItemIcon>
          <AssignmentLateIcon />
        </ListItemIcon>
        <ListItemText primary={"該当なし"} />
      </ListItem>
    </List>
  );
};

const AcCatalogMenu = React.forwardRef<
  HTMLDivElement,
  anchorEl
>((props, ref) => {
  const { onSelectAcItem } = controller;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const viewGroupedListTab = showingList && showingList.listItems.length > 1;

  React.useEffect(() => {
    // Selectが長い場合に、スクロールを戻すための実装
    if (containerRef.current) {
      const containerEl = containerRef.current;
      const selectEl = containerEl.querySelector(".Mui-selected");
      const targetTop = selectEl?.getBoundingClientRect().top || 0;
      const containerTop = containerEl?.getBoundingClientRect().top || 0;
      const containerScrollTop = containerEl?.scrollTop || 0;
      const marginTop = viewGroupedListTab ? 48 : 0;
      const scrollSize = targetTop - containerTop + containerScrollTop - marginTop;
      containerEl?.scrollTo({ top: scrollSize, behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const { maxWidth, zIndex } = React.useMemo(() => {
    const zIndex = onDialog ? 1400 : undefined;
    return {
      maxWidth: showingTabs.length > 4 ? showingTabs.length * 100 : 400,
      zIndex,
    };
  }, [onDialog, showingTabs]);

  return (
    <>
      <Popper
        ref={ref}
        open={controller.isShowAcMenu}
        anchorEl={controller.anchorEl}
        placement="bottom-start"
        sx={{ minWidth: 200, maxWidth: maxWidth, width: "50%", zIndex }}
        data-taias-el="mapping-ac"
        modifiers={[
          {
            // NOTE
            // use top & left css
            // to fix bug on using with tour-guide
            // translate3d css will be conflicted with tour-guide
            name: "computeStyles",
            options: {
              gpuAcceleration: false,
            },
          },
        ]}
      >
        <Paper sx={{ width: "100%" }}>
          <Stack className="mapping_ac_catalog_menu_paper">
            <MappingAcCatalogTab
              tabItems={controller.showingTabs}
              selectedTabIndex={controller.selectedTabIndex}
              setSelectedTab={controller.setSelectedTab}
            />
            <Stack ref={containerRef} sx={{ overflowY: "auto", overflowX: "hidden", maxHeight: "calc(600px - 48px)" }}>
              <Stack>
                {!showingList ? (
                  toEmptyList()
                ) : (
                  <MappingAcCatalogMenuList
                    showingList={showingList}
                    onClickItem={onSelectAcItem}
                    selected={controller.selected}
                  />
                )}
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Popper>
    </>
  );
});
export default MappingAcCatalogMenu;
