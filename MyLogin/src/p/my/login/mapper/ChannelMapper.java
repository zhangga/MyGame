package p.my.login.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import p.my.login.bean.Channel;

public interface ChannelMapper {
	
	@Select("select * from channel")
	public List<Channel> getAllChannel();
	
	@Update("update channel set idx = #{idx} where id = #{id}")
	public void updateChannel(Channel channel);

}
