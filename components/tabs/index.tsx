import * as React from 'react';
import RcTabs, { TabPane, TabsProps as RcTabsProps } from 'rc-tabs';
import { EditableConfig } from 'rc-tabs/lib/interface';
import classNames from 'classnames';
import omit from 'omit.js';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

import { ConfigConsumer, ConfigConsumerProps, ConfigContext } from '../config-provider';
import { cloneElement, isValidElement } from '../_util/reactNode';
import { SizeType } from '../config-provider/SizeContext';

export type TabsType = 'line' | 'card' | 'editable-card';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TabsProps extends Omit<RcTabsProps, 'editable'> {
  type?: TabsType;
  size?: SizeType;
  hideAdd?: boolean;
  onEdit?: (e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => void;
}

function Tabs({ type, className, size, onEdit, hideAdd, ...props }: TabsProps) {
  const { prefixCls: customizePrefixCls } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('tabs', customizePrefixCls);

  let editable: EditableConfig | undefined;
  if (type === 'editable-card') {
    editable = {
      onEdit: (editType, { key, event }) => {
        onEdit?.(editType === 'add' ? event : key!, editType);
      },
      removeIcon: <CloseOutlined />,
      addIcon: <PlusOutlined />,
      showAdd: hideAdd !== false,
    };
  }

  return (
    <RcTabs
      {...props}
      className={classNames(className, {
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-card`]: ['card', 'editable-card'].includes(type as string),
        [`${prefixCls}-editable-card`]: type === 'editable-card',
      })}
      editable={editable}
      moreIcon={<EllipsisOutlined />}
      prefixCls={prefixCls}
    />
  );
}

Tabs.TabPane = TabPane;

export default Tabs;
